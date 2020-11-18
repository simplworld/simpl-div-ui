import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import DecisionFormContainer from '../containers/DecisionFormContainer'

import StatusNotificationContainer from '../containers/StatusNotificationContainer';

class PlayerHome extends React.Component {
  render() {
    const quotient = (this.props.result) ? this.props.result.data.quotient : '';
    const other_operand = (this.props.other_decision) ? this.props.other_decision.data.operand : 'TBD';
    const operand = (this.props.decision) ? this.props.decision.data.operand : 0;
    let play = '';
    if (this.props.canPlay) {
      play = (
        <div>
          <br/>
          <p>You are in charge of submitting a valid {this.props.runuser.role_name}.</p>
          < DecisionFormContainer period={this.props.period} operand={operand}/>
          <StatusNotificationContainer/>
        </div>
      );
    } else {
      play = (
        <div>
          <span>World {this.props.runuser.role_name}: {operand}</span>
        </div>
      );
    }

    return (
      <div>
        <h1>Hello Player: {this.props.runuser.email}</h1>
        <span>World Quotient: {quotient} </span><br/>
        <span>World {this.props.other_role_name}: {other_operand}</span><br/>
        {play}
        <br/>
        <a href="/logout/" className="btn btn-success btn-lg">Logout</a>
      </div>
    );
  }
}

PlayerHome.propTypes = {
  canPlay: PropTypes.bool.isRequired,
  runuser: PropTypes.object.isRequired,
  other_role_name: PropTypes.string.isRequired,
  period: PropTypes.object.isRequired,
  decision: PropTypes.object,
  other_decision: PropTypes.object,
  result: PropTypes.object,
};

function mapStateToProps(state) {
  const runuser = state.simpl.current_runuser;

  const run = state.simpl.run.find(
    (r) => r.id === runuser.run
  )
  const currentPhase = state.simpl.phase.find(
    (p) => p.id === run.phase
  )
  const playPhase = state.simpl.phase.find(
    (p) => p.name === 'Play'
  )
  const canPlay = playPhase.id === currentPhase.id;
  // console.log("PlayerHome: currentPhase=", currentPhase, ", playPhase.id=", playPhase.id, ", canPlay=", canPlay);

  const other_role = state.simpl.role.find((r) => r.id !== runuser.role);
  const other_role_name = other_role.name;

  const scenario = state.simpl.scenario.find(
    (s) => runuser.world === s.world
  );

  const period = state.simpl.period.find(
    (p) => scenario.id === p.scenario
  );

  const decision = state.simpl.decision.find(
    (d) => period.id === d.period && d.role === runuser.role
  );

  const other_decision = state.simpl.decision.find(
    (d) => period.id === d.period && d.role !== runuser.role
  );

  const result = state.simpl.result.find(
    (r) => period.id === r.period
  );

  return {
    canPlay,
    runuser,
    other_role_name,
    period,
    decision,
    other_decision,
    result
  };
}

const module = connect(
  mapStateToProps,
  null
)(PlayerHome);

export default module;
