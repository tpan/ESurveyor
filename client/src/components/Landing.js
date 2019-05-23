import React from 'react';
import example from '../assets/example.png';

const sectionStyle = {
	width: '100%',
	height: '400px',
	backgroundImage: `url(${example})`,
	backgroundSize: 'contain',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
};
const Landing = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<h1>ESurveyor</h1>
			<h6>Collect feedback through emails!</h6>
			<a href='/auth/google'>Proceed by logging in with your google account</a>
			<div style={sectionStyle} />
		</div>
	);
};
export default Landing;
