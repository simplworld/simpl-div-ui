import { handleActions } from 'redux-actions'
import recycleState from 'redux-recycle'

import { recyleStateAction } from 'simpl-react/lib/actions/state'

import { setStatus, clearStatus } from '../actions/CommonActions'

const initial = { message: null }

const status = handleActions(
  {
    [setStatus](state, action) {
      const message = action.payload
      console.log('setting status.message: ', message)
      return Object.assign({}, state, {
        message,
      })
    },

    [clearStatus](state) {
      console.log('clearing status.message')
      return Object.assign({}, state, {
        message: null,
      })
    },
  },
  initial
)

export default recycleState(status, `${recyleStateAction}`)
