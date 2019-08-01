import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		if (this.props.surveys.length > 0) {
			return this.props.surveys.reverse().map((survey) => {
				return (
					<div className="card darken-1 blue-grey" key={survey._id}>
						<div className="card-content white-text">
							<span className="card-title">{survey.title}</span>
							<p>{survey.body}</p>
							<p className="right">
								Sent On: {new Date(survey.dateSent).toLocaleDateString()}
							</p>
						</div>
						<div className="card-action">
							<a>Yes: {survey.yes}</a>
							<a>No: {survey.no}</a>
							<button
								onClick={() => this.props.deleteSurvey(survey._id)}
								className="btn btn-danger">
								Delete Survey
							</button>
						</div>
					</div>
				);
			});
		} else {
			return (
				<div className="card darken-1 blue-grey">
					<div className="card-content white-text">
						<span className="card-title center-align">
							To get started please add credits and then create your survey
							using the "+" icon
						</span>
					</div>
				</div>
			);
		}
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
