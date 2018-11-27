import { handleActions } from 'redux-actions'
import recycleState from 'redux-recycle'
import { recyleStateAction } from 'simpl-react/lib/actions/state'

import { startProcessing, completeProcessing } from '../actions/CommonActions'

const initialState = { inProcess: false }

const processing = handleActions(
  {
    [startProcessing](state) {
      return Object.assign({}, state, {
        inProcess: true,
      })
    },

    [completeProcessing](state) {
      // console.log("setting inProcess: false");
      return Object.assign({}, state, {
        inProcess: false,
      })
    },
  },
  initialState
)

export default recycleState(processing, `${recyleStateAction}`)
