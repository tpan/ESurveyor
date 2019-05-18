const _ = require('lodash')
const Path = require('path-parser').default
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const minCredits = require('../middlewares/minCredits')
const Mailer = require('../services/mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')
//TODO add custom redirect url/thanks page depending on given url; Depending on feedback?
//Blacklist Recipients sub document model. In mongoose Object T/F, string are equivalent

module.exports = app => {
	app.get('/api/surveys', async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false,
		})
		res.send(surveys)
	})

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for your feedback!')
	})

	//Destructure event, url and email.
	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice')

		events = _.chain(req.body)
			.map(({ url, email }) => {
				const match = p.test(new URL(url).pathname)
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice }
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false },
						},
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date(),
					},
				).exec()
			})
			.value()

		res.send({})
	})

	app.post('/api/surveys', requireLogin, minCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
		})
		const mailer = new Mailer(survey, surveyTemplate(survey))

		try {
			await mailer.send()
			await survey.save()

			req.user.credits -= 1
			const user = await req.user.save()

			res.send(user)
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
