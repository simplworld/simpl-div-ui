import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import DecisionForm from '../components/DecisionForm';

import {submitDecision, setStatus} from '../actions/Actions';

function mapStateToProps(state, ownProps) {
  const initialValues = {
    'operand': ownProps.operand
  };
  return {
    runuser: state.simpl.current_runuser,
    initialValues
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    submitDecision(values) {
      // submit player's decision
      const operand = values.operand;
      dispatch(submitDecision(ownProps.period, operand))
        .then((result) => {
          const status = result.payload;
          if (status !== 'ok') {
            console.log("DecisionFormContainer.submitDecision failed due to: ", status);
            dispatch(setStatus(status));
          } else {
            console.log("DecisionFormContainer.submitDecision succeeded");
            dispatch(setStatus(''));
          }
        });
    }
  };
}

const DecisionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionForm);

export default withRouter(DecisionFormContainer);
