import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { selectRoot, resetSubmissions, saveSubmission, Form, selectError, Errors } from 'react-formio';
import { push } from 'connected-react-router';

import Loading from '../../../../../containers/Loading'

import { setFormSubmissionError } from '../../../../../actions/formActions';
import SubmissionError from '../../../../../containers/SubmissionError';
import { setUpdateLoader } from "../../../../../actions/taskActions";

const Edit = class extends Component {
  render() {
    const {
      hideComponents,
      onSubmit,
      options,
      errors,
      form: { form, isActive: isFormActive },
      submission: { submission, isActive: isSubActive, url }
    } = this.props;

    if (isFormActive || isSubActive) {
      return <Loading />;
    }

    return (
      <div className="container">
        <div className="main-header">
          <SubmissionError modalOpen={this.props.submissionError.modalOpen}
            message={this.props.submissionError.message}
            onConfirm={this.props.onConfirm}
          >
          </SubmissionError>
          <h3 className="task-head">{form.title} Submission</h3>
        </div>
        <Errors errors={errors} />
        <Form
          form={form}
          submission={submission}
          url={url}
          hideComponents={hideComponents}
          onSubmit={onSubmit}
          options={{ ...options }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userDetail,
    form: selectRoot('form', state),
    submission: selectRoot('submission', state),
    isAuthenticated: state.user.isAuthenticated,
    errors: [
      selectError('form', state),
      selectError('submission', state),
    ],
    options: {
      noAlerts: false,
      i18n: {
        en: {
          error: "Please fix the errors before submitting again.",
        },
      }
    },
    submissionError: selectRoot('formDelete', state).formSubmissionError,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (submission) => {
      dispatch(saveSubmission('submission', submission, ownProps.match.params.formId, (err, submission) => {
        if (!err) {
          dispatch(setUpdateLoader(true));
          dispatch(resetSubmissions('submission'));
          dispatch(push(`/form/${ownProps.match.params.formId}/submission/${submission._id}`))
        }
        else {
          const ErrorDetails = { modalOpen: true, message: "Submission cannot be done" }
          dispatch(setFormSubmissionError(ErrorDetails))
        }
      }));
    },
    onConfirm: () => {
      const ErrorDetails = { modalOpen: false, message: "" }
      dispatch(setFormSubmissionError(ErrorDetails))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit)
