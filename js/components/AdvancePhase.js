import React from 'react';
import {Button} from 'react-bootstrap';

import PropTypes from 'prop-types';

class AdvancePhase extends React.Component {
  render() {
    const phases = this.props.phases || [];

    const currentPhase = phases.find(
      (phase) => phase.id == this.props.run.phase
    );

    const nextPhase = phases.find(
      (phase) => phase.order == currentPhase.order + 1
    )

    if (nextPhase === undefined) {
      return (<span>{currentPhase.name}</span>);
    } else {
      if (this.props.advancingPhase) {
        return (
          <Button type='button'
             className="btn btn-sm btn-labeled btn-primary disabled">
            Advance to {nextPhase.name}
          </Button>
        );
      } else {
        return (
          <Button type='button'
             className="btn btn-sm btn-labeled btn-primary"
             onClick={() => this.props.advanceRunPhase(this.props.run)}>
            Advance to {nextPhase.name}
          </Button>
        );
      }
    }
  }
}

AdvancePhase.propTypes = {
  run: PropTypes.object.isRequired,
  phases: PropTypes.array,
  advanceRunPhase: PropTypes.func.isRequired,
  advancingPhase: PropTypes.bool.isRequired,
};

export default AdvancePhase;
