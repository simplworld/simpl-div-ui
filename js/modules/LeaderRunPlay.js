import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import RunRowContainer from '../containers/RunRowContainer'

class LeaderHome extends React.Component {

  render() {
    const name = this.props.runuser.first_name + ' ' + this.props.runuser.last_name;
    const runRows = this.props.runs.map(
      (r) => <RunRowContainer key={r.id} run={r}/>
    );
    return (
      <div>
        <div>
          <h1>Hello {name}</h1>
        </div>
        <div>
          <table>
            <thead>
            <tr>
              <th width="60%">Run</th>
              <th width="30%">&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {runRows}
            </tbody>
          </table>
        </div>
        <br/>
        <a href="/logout/" className="btn btn-success btn-lg">Logout</a>
      </div>
    );
  }
}

LeaderHome.propTypes = {
  runuser: PropTypes.object.isRequired,
  runs: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    runuser: state.simpl.current_runuser,
    runs: state.simpl.run
  };
}

const module = connect(
  mapStateToProps,
  null
)(LeaderHome);

export default module;
