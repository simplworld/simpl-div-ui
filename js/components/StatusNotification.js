import React from 'react';
import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';


class StatusNotification extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.state = {
      show_modal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    return this.setState((prevState, props) => ({
      show_modal: props.message !== null,
    }));
  }

  toggleModal() {
    this.props.clearMessage();
    this.setState({show_modal: !this.state.show_modal});
  }

  hideModal() {
    this.props.clearMessage();
    this.setState({show_modal: false});
  }

  render() {
    return (
      <Modal
        show={this.state.show_modal}
        onHide={this.hideModal}
      >
        <Modal.Body style={{backgroundColor: '#F0AD4E'}}>
          <div className=""><p>{this.props.message}</p></div>
          <div className="text-center" style={{marginLeft:30, marginRight: 30, marginBottom: 30, marginTop:30}}>
            <button type="button" onClick={this.toggleModal}>Close</button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

StatusNotification.propTypes = {
  message: PropTypes.string,
  clearMessage: PropTypes.func.isRequired,
};

StatusNotification.defaultProps = {
  message: null,
};


export default StatusNotification;
