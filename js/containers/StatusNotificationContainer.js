import {connect} from 'react-redux';

import StatusNotification from '../components/StatusNotification';
import {
  clearStatus
} from '../actions/Actions';

function mapStateToProps(state, ownProps) {
  return {
    message: state.status.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearMessage: function () {
      dispatch(clearStatus());
    }
  }
}

const StatusNotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusNotification);

export default StatusNotificationContainer;
