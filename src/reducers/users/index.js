/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {
  isLoading: false,
  addingGratefulList: false,
  getReflectionLoading: false,
  creatingTask: false,
  completingTask: false,
  creatingProfile: false,
  userDetails: [],
  reflectionDetail: {},
  journalDetail: [],
  allUserList: [],
};
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_USER_DETAILS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case Types.GET_USER_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        userDetails: action.payload.data[0],
      });
    case Types.GET_USER_DETAILS_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
      });

    case Types.SAVE_GRATEFUL_LIST_REQUEST:
      return Object.assign({}, state, {
        addingGratefulList: true,
      });
    case Types.SAVE_GRATEFUL_LIST_SUCCESS:
      return Object.assign({}, state, {
        addingGratefulList: false,
      });
    case Types.SAVE_GRATEFUL_LIST_FAIL:
      return Object.assign({}, state, {
        addingGratefulList: false,
      });

    case Types.GET_REFLECTIONS_REQUEST:
      return Object.assign({}, state, {
        getReflectionLoading: true,
      });
    case Types.GET_REFLECTIONS_SUCCESS:
      return Object.assign({}, state, {
        getReflectionLoading: false,
        reflectionDetail: action.payload,
      });
    case Types.GET_REFLECTIONS_FAIL:
      return Object.assign({}, state, {
        getReflectionLoading: false,
      });

    case Types.CREATE_TASK_REQUEST:
      return Object.assign({}, state, {
        creatingTask: true,
      });
    case Types.CREATE_TASK_SUCCESS:
      return Object.assign({}, state, {
        creatingTask: false,
      });
    case Types.CREATE_TASK_FAIL:
      return Object.assign({}, state, {
        creatingTask: false,
      });

    case Types.SET_TASK_COMPLETED_REQUEST:
      return Object.assign({}, state, {
        completingTask: true,
      });
    case Types.SET_TASK_COMPLETED_SUCCESS:
      return Object.assign({}, state, {
        completingTask: false,
      });
    case Types.SET_TASK_COMPLETED_FAIL:
      return Object.assign({}, state, {
        completingTask: false,
      });

    case Types.CREATE_PROFILE_REQUEST:
      return Object.assign({}, state, {
        creatingProfile: true,
      });
    case Types.CREATE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        creatingProfile: false,
      });
    case Types.CREATE_PROFILE_FAIL:
      return Object.assign({}, state, {
        creatingProfile: false,
      });

    case Types.GET_LOGS_REQUEST:
      return Object.assign({}, state, {
        loadingLogs: true,
      });
    case Types.GET_LOGS_SUCCESS:
      return Object.assign({}, state, {
        loadingLogs: false,
        userLogs: action.payload && action.payload[0],
      });
    case Types.GET_LOGS_FAIL:
      return Object.assign({}, state, {
        loadingLogs: false,
      });

    case Types.GET_TODAYS_REFLECTION_REQUEST:
      return Object.assign({}, state, {
        loadingReflection: true,
      });
    case Types.GET_TODAYS_REFLECTION_SUCCESS:
      return Object.assign({}, state, {
        loadingReflection: false,
        todaysReflection: action.payload,
      });
    case Types.GET_TODAYS_REFLECTION_FAIL:
      return Object.assign({}, state, {
        loadingReflection: false,
      });

    case Types.GET_GRATITUDE_LIST_REQUEST:
      return Object.assign({}, state, {
        loadingJournal: true,
      });
    case Types.GET_GRATITUDE_LIST_SUCCESS:
      return Object.assign({}, state, {
        loadingJournal: false,
        journalDetail: action.payload,
      });
    case Types.GET_GRATITUDE_LIST_FAIL:
      return Object.assign({}, state, {
        loadingJournal: false,
      });

    case Types.GET_USERS_LIST_REQUEST:
      return Object.assign({}, state, {});
    case Types.GET_USERS_LIST_SUCCESS:
      return Object.assign({}, state, {
        allUserList: action.payload,
      });
    case Types.GET_USERS_LIST_FAIL:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}
export default userReducer;
