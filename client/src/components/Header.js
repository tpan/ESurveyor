import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
	// renderContent() {
	// 	switch (this.props.auth) {
	// 		case null:
	// 			return;
	// 		case false:
	// 			return (
	// 				<li>
	// 					<a href='/auth/google'>Login With Google</a>
	// 				</li>
	// 			);
	// 		default:
	// 			return (
	// 				<li>
	// 					<a href='/api/logout'>Logout</a>
	// 				</li>
	// 			);
	// 	}
	// }
	renderContent() {
		switch (this.props.auth) {
			case null:
				return 'stilldeciding';
			case false:
				return 'im logged out';
			default:
				return 'im logged in';
		}
	}
	render() {
		console.log(this.props);
		return (
			<nav>
				<div className='nav-wrapper'>
					<a href='/' className='left brand-logo'>
						Emaily
					</a>
					<ul className='right'>{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}
// Accessing redux store in Header component
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
