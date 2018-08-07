import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router';

import AdvancePhaseContainer from '../containers/AdvancePhaseContainer';

class RunRow extends React.Component {
  constructor(props) {
    super(props);
    this.getPhase = this.getPhase.bind(this);
  }

  getPhase() {
    return this.props.phases.find(
      (p) => p.id == this.props.run.phase
    );
  }

  render() {
    const phase = this.getPhase();
    const linkDestination = `/run/${this.props.run.id}/debrief`;

    let name = this.props.run.name;
    if ((phase.name === 'Debrief')) {
      name = (
        <Link to={linkDestination} id={`Link_${this.props.run.name}`}>{this.props.run.name}</Link>
      );
    }

    return (
      <tr>
        <td>{name}</td>
        <td>
          <AdvancePhaseContainer run={this.props.run}/>
        </td>
      </tr>
    );
  }
}

RunRow.propTypes = {
  run: PropTypes.object.isRequired,
  phases: PropTypes.array.isRequired,
};

export default RunRow;
