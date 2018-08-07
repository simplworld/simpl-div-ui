import {connect} from 'react-redux';

import WorldRow from '../components/WorldRow';

function mapStateToProps(state, ownProps) {
  const world = ownProps.world;

  const scenario = state.simpl.scenario.find(
    (s) => world.id === s.world
  );

  const period = state.simpl.period.find(
    (p) => scenario.id === p.scenario
  );

  const decisions = state.simpl.decision.filter(
    (d) => period.id === d.period
  );

  const dividendRole = state.simpl.role.find(
    (r) => r.name === 'Dividend'
  );

  let dividend = '';
  let divisor = '';
  decisions.forEach((d) => {
    if (d.role === dividendRole.id) {
      dividend = d.data.operand.toString();
    } else {
      divisor = d.data.operand.toString();
    }
  });

  const result = state.simpl.result.find(
    (r) => period.id === r.period
  );

  let quotient = '';
  if (result != undefined) {
    quotient = result.data.quotient.toString();
  }

  console.log('WorldRowContainer: dividend=', dividend, ', divisor=', divisor, ', quotient=', quotient);
  return {
    world,
    dividend,
    divisor,
    quotient
  };
}

const WorldRowContainer = connect(
  mapStateToProps,
  null
)(WorldRow);

export default WorldRowContainer;
