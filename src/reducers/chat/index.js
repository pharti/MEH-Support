/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {
  gettingActivities: false,
  allActivities: null,
};
function chatReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_ALL_ACTIVITIES_REQUEST:
      return Object.assign({}, state, {
        gettingActivities: true,
      });
    case Types.GET_ALL_ACTIVITIES_SUCCESS:
      return Object.assign({}, state, {
        gettingActivities: false,
        allActivities: action.payload,
      });
    case Types.GET_ALL_ACTIVITIES_FAIL:
      return Object.assign({}, state, {
        gettingActivities: false,
      });
    default:
      return state;
  }
}
export default chatReducer;
