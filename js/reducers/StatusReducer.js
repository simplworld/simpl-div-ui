import {createReducer} from 'redux-create-reducer';
import recycleState from 'redux-recycle';

import {recyleStateAction} from 'simpl-react/lib/actions/state';

import {
  setStatus,
  clearStatus
} from '../actions/Actions';

const initial = {message: ''};

const status = recycleState(createReducer(initial, {
  [setStatus](state, action) {
    const message = action.payload;
    console.log("setting status.message: ", message);
    return Object.assign({}, state, {
      message: message
    });
  },
  [clearStatus](state) {
    console.log("clearing status.message");
    return Object.assign({}, state, {
      message: ''
    });
  },
}), `${recyleStateAction}`);

export default status;
