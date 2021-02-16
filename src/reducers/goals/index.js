/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {
  isLoading: false,
  loadingSoberDates: false,
  creatingMilestone: false,
  adminGoals: [],
  soberMilestone: [],
};
function goalsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_ADMIN_GOALS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case Types.GET_ADMIN_GOALS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        adminGoals: action.payload.data,
      });
    case Types.GET_ADMIN_GOALS_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case Types.GET_SOBER_DATES_REQUEST:
      return Object.assign({}, state, {
        loadingSoberDates: true,
      });
    case Types.GET_SOBER_DATES_SUCCESS:
      return Object.assign({}, state, {
        loadingSoberDates: false,
        soberMilestone: action.payload.data,
      });
    case Types.GET_SOBER_DATES_FAIL:
      return Object.assign({}, state, {
        loadingSoberDates: false,
      });

    case Types.CREATE_MILESTONE_REQUEST:
      return Object.assign({}, state, {
        creatingMilestone: true,
      });
    case Types.CREATE_MILESTONE_SUCCESS:
      return Object.assign({}, state, {
        creatingMilestone: false,
      });
    case Types.CREATE_MILESTONE_FAIL:
      return Object.assign({}, state, {
        creatingMilestone: false,
      });
    default:
      return state;
  }
}
export default goalsReducer;
