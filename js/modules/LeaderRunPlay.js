import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import AdvancePhaseContainer from '../containers/AdvancePhaseContainer';

class LeaderRunPlay extends React.Component {
  render() {
    const name = this.props.run.name;

    return (
      <div>
        <div>
          <h1>Playing Run: {name}</h1>
        </div>
        <br/>
        <div>
            <AdvancePhaseContainer run={this.props.run}/>
        </div>
        <br/>
        <a href="/" className="btn btn-success btn-lg">Return to Run Dashboard</a>
        <br/>
        <a href="/logout/" className="btn btn-success btn-lg">Logout</a>
      </div>
    );
  }
}

LeaderRunPlay.propTypes = {
  run: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  const run = state.simpl.run.find(
    (r) => r.id == ownProps.params['id']
  );

  return {
    run,
  };
}

const module = connect(
  mapStateToProps,
  null
)(LeaderRunPlay);

export default withRouter(module);
