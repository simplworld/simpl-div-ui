import {createAction} from 'redux-actions';

import AutobahnReact from 'simpl/lib/autobahn';

// actions used to bracket processing a request (e.g. advancing the phase)
export const startProcessing = createAction('START_PROCESSING');
export const completeProcessing = createAction('COMPLETE_PROCESSING');

// actions for setting / clearing a status message
export const setStatus = createAction('SET_STATUS');
export const clearStatus = createAction('CLEAR_STATUS');

// advance run to next phase
export const advanceRunPhase = createAction('ADVANCE_RUN_PHASE', (run, ...args) => (
  AutobahnReact.call(`model:model.run.${run.id}.advance_phase`)
));

// submit player decision then calculate result if both dividend and divisor have been submitted
export const submitDecision = createAction('SUBMIT_DECISION', (period, operand, ...args) =>
  AutobahnReact.call(`model:model.period.${period.id}.submit_decision`, [operand])
);

