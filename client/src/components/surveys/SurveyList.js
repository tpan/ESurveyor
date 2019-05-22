import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div className='card darken-1 blue-grey' key={survey._id}>
					<div className='card-content white-text'>
						<span className='card-title'> </span>
						{survey.title}
						<p>{survey.body}</p>
						<p className='right'>
							Sent On: {new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className='card-action'>
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
						<button
							onClick={() => this.props.deleteSurvey(survey._id)}
							className='btn btn-danger'
						>
							Delete Survey
						</button>
					</div>
				</div>
			);
		});
	}
	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(
	mapStateToProps,
	{ fetchSurveys, deleteSurvey },
)(SurveyList);
