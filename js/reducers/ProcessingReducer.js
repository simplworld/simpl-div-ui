import {createReducer} from 'redux-create-reducer';
import recycleState from 'redux-recycle';

import {recyleStateAction} from 'simpl/lib/actions/state';

import {
  startProcessing,
  completeProcessing
} from '../actions/Actions';

const initial = {inProcess: false};

const processing = recycleState(createReducer(initial, {
  [startProcessing](state, action) {
    return Object.assign({}, state, {
      inProcess: true
    });
  },
  [completeProcessing](state, action) {
    // console.log("setting inProcess: false");
    return Object.assign({}, state, {
      inProcess: false
    });
  },
}), `${recyleStateAction}`);

export default processing
