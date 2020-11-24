import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';

import { isEmpty, isNil } from 'lodash';

import {SimplActions} from 'simpl-react/lib/actions';


import WorldRowContainer from '../containers/WorldRowContainer';


class LeaderRunDebrief extends React.Component {

  componentDidMount() {
    // load run's worlds if not already loaded
    const {run, loadedRun, loadRunData} = this.props;
    // console.log("componentDidMount: loadedRun:", loadedRun);
    loadRunData(run, loadedRun);
  }

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
        <Link to='/' id={`home`}>Return to Run Dashboard</Link>
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
    loadedRun: state.simpl.loaded_run
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadRunData(run, loadedRun) {
      // console.log(`mapDispatchToProps.loadRunData:`);
      if (!isNil(run)) {
        if (isEmpty(loadedRun) || run.id != loadedRun.id) {
          // load run's world data
          const topic = `model:model.run.${run.id}`;
          dispatch(SimplActions.getDataTree(topic));
          dispatch(SimplActions.setLoadedRun(run));
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
