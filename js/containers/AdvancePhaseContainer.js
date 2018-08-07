import {connect} from 'react-redux';

import AdvancePhase from '../components/AdvancePhase';
import {
  advanceRunPhase,
  startProcessing,
  completeProcessing
} from '../actions/Actions';

function mapStateToProps(state) {
  return {
    phases: state.simpl.phase,
    advancingPhase: state.processing.inProcess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    advanceRunPhase: function (run) {
      dispatch(startProcessing());   // disable all advance phase buttons
      dispatch(advanceRunPhase(run))
        .then((result) => {
          dispatch(completeProcessing());    // enable all advance phase  buttons
        });
    }
  };
}

const AdvancePhaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancePhase);

export default AdvancePhaseContainer;
