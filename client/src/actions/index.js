import axios from 'axios'
import { FETCH_USER } from './types'
import { FETCH_SURVEYS } from './types'
import { DELETE_SURVEY } from './types'

// fetch user model for current logged in user
// export const fetchUser = () =>
// 	function (dispatch) {
// 		axios
// 			.get('/api/current_user')
// 			.then(res => dispatch({ type: FETCH_USER, payload: res }));
// 	};
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user')
	dispatch({ type: FETCH_USER, payload: res.data })
}

//TODO make this code bonedry, generic ajax requests?
export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token)

	dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values)

	history.push('/surveys')
	dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys')

	dispatch({ type: FETCH_SURVEYS, payload: res.data })
}

export const deleteSurvey = surveyId => async dispatch => {
	const res = await axios.delete(`/api/surveys/${surveyId}`)

	dispatch({ type: DELETE_SURVEY, payload: res.data.id })
}
