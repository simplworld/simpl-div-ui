import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Alert} from 'react-bootstrap';

import { isEmpty, isNil } from 'lodash';

import {SimplActions} from 'simpl-react/lib/actions';
// import {simpl} from 'simpl-react/lib/decorators/simpl';

import WorldRowContainer from '../containers/WorldRowContainer';


class LeaderRunDebrief extends React.Component {

  componentDidMount() {
    // load run's worlds if not already loaded
    const {run, loadedRun, loadedWorlds, loadRunData} = this.props;
    console.log("componentDidMount: loadedRun:", loadedRun);
    loadRunData(run, loadedRun, loadedWorlds);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
  }

  render() {
    const loadedRun = this.props.loadedRun;
    console.log("render: loadedRun: ", loadedRun);

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
  loadedRun: PropTypes.object,
  loadedWorlds: PropTypes.array,

  loadRunData: PropTypes.func.isRequired,
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
    loadedRun: state.simpl.loaded_run,
    loadedWorlds: state.simpl.world
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadRunData(run, loadedRun, loadedWorlds) {
      console.log(`mapDispatchToProps.loadRunData:`);
      if (!isNil(run)) {
        if (!isEmpty(loadedRun) && run.pk != loadedRun.pk) {
          // unload currently loaded world data
          console.log('unloading loadedWorlds:', loadedWorlds);
          loadedWorlds.forEach((world) => {
            dispatch(removeChild(world));
          });
        }
        if (isEmpty(loadedRun) || run.pk != loadedRun.pk) {
          // load run's world data
          const runId = run.id;
          const topic = `model:model.run.${runId}`;
          dispatch(SimplActions.getDataTree(topic));
          dispatch(SimplActions.setLoadedRun(runId));
          // simpl.loadRunData(run);
        }
      }
    },
  };
};

const module = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderRunDebrief);

export default withRouter(module);
