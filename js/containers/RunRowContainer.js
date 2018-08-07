import {connect} from 'react-redux';

import RunRow from '../components/RunRow';

function mapStateToProps(state, ownProps) {
  const run = ownProps.run;
  return {
    phases: state.simpl.phase,
  };
}

const RunRowContainer = connect(
  mapStateToProps,
  null
)(RunRow);

export default RunRowContainer;
