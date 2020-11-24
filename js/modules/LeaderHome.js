import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import RunRowContainer from '../containers/RunRowContainer'
import {isEmpty} from "lodash";
import {SimplActions} from "simpl-react/lib/actions";

class LeaderHome extends React.Component {

  componentDidMount() {
    // unload any loaded worlds
    const {loadedRun, unloadRunData} = this.props;
    unloadRunData(loadedRun);
  }

  render() {
    const name = this.props.runuser.first_name + ' ' + this.props.runuser.last_name;
    const runRows = this.props.runs.map(
      (r) => <RunRowContainer key={r.id} run={r}/>
    );
    return (
      <div>
        <div>
          <h1>{name} Run Dashboard</h1>
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
  loadedRun: PropTypes.object,

  unloadRunData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    runuser: state.simpl.current_runuser,
    runs: state.simpl.run,
    loadedRun: state.simpl.loaded_run
  };
}

const mapDispatchToProps = dispatch => {
  return {
    unloadRunData(loadedRun) {
      console.log(`mapDispatchToProps.unloadRunData:`);
      if (!isEmpty(loadedRun)) {
        dispatch(SimplActions.unloadWorlds(loadedRun)); // 4
      }
    }
  }
};

const module = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderHome);

export default module;
