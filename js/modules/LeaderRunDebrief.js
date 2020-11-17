import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Alert} from 'react-bootstrap';

import WorldRowContainer from '../containers/WorldRowContainer';


class LeaderRunDebrief extends React.Component {
  render() {
    const name = this.props.run.name;
    const worldRows = this.props.worlds.map(
      (w) => <WorldRowContainer key={w.id} world={w}/>
    );
    return (
      <div>
        <div>
          <h1>Debrief Run: {name}</h1>
        </div>
        <div>
          <table>
            <thead>
            <tr>
              <th>World</th>
              <th>Dividend</th>
              <th>Divisor</th>
              <th>Quotient</th>
            </tr>
            </thead>
            <tbody>
            {worldRows}
            </tbody>
          </table>
        </div>
        <br/>
        <a href="/" className="btn btn-success btn-lg">Return to Run Dashboard</a>
        <br/>
        <a href="/logout/" className="btn btn-success btn-lg">Logout</a>
      </div>
    );
  }
}

LeaderRunDebrief.propTypes = {
  run: PropTypes.object.isRequired,
  worlds: PropTypes.array.isRequired,

};

function mapStateToProps(state, ownProps) {
  const run = state.simpl.run.find(
    (r) => r.id == ownProps.params['id']
  );

  const unsortedWorlds = state.simpl.world.filter(
    (w) => run.id === w.run
  );
  const worlds = _.sortBy(unsortedWorlds, (s) => s.id);   // worlds are created in order

  return {
    run,
    worlds,
  };
}

const module = connect(
  mapStateToProps,
  null
)(LeaderRunDebrief);

export default withRouter(module);
