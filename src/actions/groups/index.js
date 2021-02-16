/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';
import RestClient from 'helpers/RestClient';
import Helpers from 'helpers/OtherHelper';
export const getAllGroups = () => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_ALL_GROUPS_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.getCall('groups/allGroups', token);
      if (response && response.code == 200) {
        dispatch({type: Types.GET_ALL_GROUPS_SUCCESS, payload: response.data});
      } else {
        dispatch({type: Types.GET_ALL_GROUPS_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.GET_ALL_GROUPS_FAIL});
    }
  };
};

export const getGroupDetail = groupId => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_GROUP_DETAIL_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.getCall(`groups/${groupId}`, token);
      if (response && response.code == 200) {
        dispatch({
          type: Types.GET_GROUP_DETAIL_SUCCESS,
          payload: response.data && response.data[0],
        });
      } else {
        dispatch({type: Types.GET_GROUP_DETAIL_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.GET_GROUP_DETAIL_FAIL});
    }
  };
};

export const getGroupPosts = groupId => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_GROUP_POSTS_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.getCall(
        `posts/${groupId}/allPosts`,
        token,
      );
      if (response && response.code == 200) {
        dispatch({
          type: Types.GET_GROUP_POSTS_SUCCESS,
          payload: response.data && response.data,
        });
      } else {
        dispatch({type: Types.GET_GROUP_POSTS_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.GET_GROUP_POSTS_FAIL});
    }
  };
};

export const createPost = requestPayload => {
  return async (dispatch, getState) => {
    dispatch({type: Types.CREATE_POST_REQUEST});
    try {
      const token = getState().authReducer.token;
      const {image, groupId, message} = requestPayload;
      let formdata = new FormData();

      if (image) {
        let postImage = {
          uri: image && image.uri,
          type: image && image.type,
          name: 'image.jpg',
        };
        formdata.append('image', postImage);
      } else {
        formdata.append('image', '');
      }

      formdata.append('groupId', groupId);
      formdata.append('message', message);
      console.log('formdataformdata', formdata);
      const response = await RestClient.postCall(`posts`, formdata, token);
      if (response && response.code == 200) {
        dispatch({type: Types.CREATE_POST_SUCCESS});
        dispatch(getGroupPosts(requestPayload.groupId));
      } else {
        Helpers.toast(response && response.message);
        dispatch({type: Types.CREATE_POST_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.CREATE_POST_FAIL});
    }
  };
};

export const leaveGroup = groupId => {
  return async (dispatch, getState) => {
    dispatch({type: Types.LEAVE_GROUP_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.deleteCall(
        'groups/leave/group',
        token,
        {groupId},
      );
      console.log('Response', response);
      if (response && response.code == 200) {
        setTimeout(() => {
          Helpers.toast('You are no longer a member of this group.');
        }, 200);
        dispatch({type: Types.LEAVE_GROUP_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.LEAVE_GROUP_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.LEAVE_GROUP_FAIL});
    }
  };
};

export const joinGroup = groupId => {
  return async (dispatch, getState) => {
    dispatch({type: Types.JOIN_GROUP_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.postCall(
        `groups/${groupId}/joinGroup`,
        {},
        token,
      );
      console.log('Response', response);
      if (response && response.code == 200) {
        setTimeout(() => {
          Helpers.toast('You are now a member of this group.');
        }, 200);
        dispatch({type: Types.JOIN_GROUP_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.JOIN_GROUP_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.JOIN_GROUP_FAIL});
    }
  };
};
