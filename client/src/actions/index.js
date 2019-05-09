import axios from 'axios';
import { FETCH_USER } from './types';

// fetch user model for current logged in user
// export const fetchUser = () =>
// 	function (dispatch) {
// 		axios
// 			.get('/api/current_user')
// 			.then(res => dispatch({ type: FETCH_USER, payload: res }));
// 	};
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};
