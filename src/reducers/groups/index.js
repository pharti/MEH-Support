/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {
  gettingGroups: false,
  gettingGroupDetail: false,
  gettingGroupPosts: false,
  joiningGroup: false,
  allGroups: null,
  groupDetail: null,
  groupPosts: null,
};
function groupsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_ALL_GROUPS_REQUEST:
      return Object.assign({}, state, {
        gettingGroups: true,
      });
    case Types.GET_ALL_GROUPS_SUCCESS:
      return Object.assign({}, state, {
        gettingGroups: false,
        allGroups: action.payload,
      });
    case Types.GET_ALL_GROUPS_FAIL:
      return Object.assign({}, state, {
        gettingGroups: false,
      });

    case Types.GET_GROUP_DETAIL_REQUEST:
      return Object.assign({}, state, {
        gettingGroupDetail: true,
      });
    case Types.GET_GROUP_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        gettingGroupDetail: false,
        groupDetail: action.payload,
      });
    case Types.GET_GROUP_DETAIL_FAIL:
      return Object.assign({}, state, {
        gettingGroupDetail: false,
      });

    case Types.GET_GROUP_POSTS_REQUEST:
      return Object.assign({}, state, {
        gettingGroupPosts: true,
      });
    case Types.GET_GROUP_POSTS_SUCCESS:
      return Object.assign({}, state, {
        gettingGroupPosts: false,
        groupPosts: action.payload && action.payload.reverse(),
      });
    case Types.GET_GROUP_POSTS_FAIL:
      return Object.assign({}, state, {
        gettingGroupPosts: false,
      });

    case Types.JOIN_GROUP_REQUEST:
      return Object.assign({}, state, {
        joiningGroup: true,
      });
    case Types.JOIN_GROUP_SUCCESS:
      return Object.assign({}, state, {
        joiningGroup: false,
      });
    case Types.JOIN_GROUP_FAIL:
      return Object.assign({}, state, {
        joiningGroup: false,
      });

    case Types.LEAVE_GROUP_REQUEST:
      return Object.assign({}, state, {
        joiningGroup: true,
      });
    case Types.LEAVE_GROUP_SUCCESS:
      return Object.assign({}, state, {
        joiningGroup: false,
      });
    case Types.LEAVE_GROUP_FAIL:
      return Object.assign({}, state, {
        joiningGroup: false,
      });
    default:
      return state;
  }
}
export default groupsReducer;
