import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router';

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
    const linkDestination = (phase.name === 'Debrief')
            ? `/run/${this.props.run.id}/debrief`
            : `/run/${this.props.run.id}/play`;

    return (
      <tr>
        <td>
          <Link to={linkDestination} id={`Link_${this.props.run.name}`}>{this.props.run.name}</Link>
        </td>
        <td>
          <span>{phase.name}</span>
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
