module.exports = survey => {
	return `
	<html>
		<body>
			<div style="text-align: center;">
				<h3>We'd love to know how we did!</h3>
				<p>Please answer the following question:</p>
				<p>${survey.body}</p>
				<div>
				<a href="${process.env.redirectDomain}/api/surveys/thanks">Yes</a>
				</div>
				<div>
				<a href="${process.env.redirectDomain}/api/surveys/thanks">No</a>
				</div>
			</div>
		</body>
	</html>
	`
}
