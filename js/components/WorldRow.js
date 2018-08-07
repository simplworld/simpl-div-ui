import React from 'react';
import PropTypes from 'prop-types';

class WorldRow extends React.Component {
  render() {
    console.log("WorldRow: props=", this.props);
    return (
      <tr>
        <td>{this.props.world.name}</td>
        <td>{this.props.dividend}</td>
        <td>{this.props.divisor}</td>
        <td>{this.props.quotient}</td>
      </tr>
    );
  }
}

WorldRow.propTypes = {
  world: PropTypes.object.isRequired,
  dividend: PropTypes.string.isRequired,
  divisor: PropTypes.string.isRequired,
  quotient: PropTypes.string.isRequired,
};

export default WorldRow;
