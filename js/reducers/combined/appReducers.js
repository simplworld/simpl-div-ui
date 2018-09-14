import {simplReducers} from 'simpl-react/lib/reducers/combined';
import {reducer as form} from 'redux-form';

import processing from '../ProcessingReducer';
import status from '../StatusReducer';

const reducers = simplReducers({
  form,
  // Add your customer reducers here, if any.
  processing,
  status
});

export default reducers;
