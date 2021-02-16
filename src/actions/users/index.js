/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';
import Helpers from 'helpers/OtherHelper';
import RestClient from 'helpers/RestClient';
export const getUserDetails = () => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_USER_DETAILS_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const response = await RestClient.getCall(`users/${userId}`, token);
      if (response && response.code == 200) {
        dispatch({type: Types.GET_USER_DETAILS_SUCCESS, payload: response});
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.GET_USER_DETAILS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_USER_DETAILS_FAIL});
    }
  };
};

export const getTodaysReflection = () => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_TODAYS_REFLECTION_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.getCall(
        `dailyReflections/latestReflection`,
        token,
      );
      if (response && response.code == 200) {
        dispatch({
          type: Types.GET_TODAYS_REFLECTION_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_TODAYS_REFLECTION_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_TODAYS_REFLECTION_FAIL});
    }
  };
};
export const addReflections = (
  title,
  description,
  whyGrateful,
  reflectionImage,
  cb,
) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.ADD_REFLECTIONS_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      let refImage = {
        uri: reflectionImage && reflectionImage.uri,
        type: reflectionImage && reflectionImage.type,
        name: 'reflection.jpg',
      };
      let formdata = new FormData();
      formdata.append('createdBy', userId);
      formdata.append('refTitle', title);
      formdata.append('refDescription', description);
      formdata.append('greateFulTo', whyGrateful);
      formdata.append('refImage', refImage);
      const response = await RestClient.postCall(
        `dailyReflections`,
        formdata,
        token,
      );
      if (response && response.code == 200) {
        dispatch({type: Types.ADD_REFLECTIONS_SUCCESS});
        cb();
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.ADD_REFLECTIONS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.ADD_REFLECTIONS_FAIL});
    }
  };
};
export const getReflectionDetail = id => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_REFLECTIONS_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.getCall(
        `dailyReflections/latestReflection/${id}`,
        token,
      );
      if (response && response.code == 200) {
        dispatch({type: Types.GET_REFLECTIONS_SUCCESS, payload: response.data});
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.GET_REFLECTIONS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_REFLECTIONS_FAIL});
    }
  };
};
export const getGratitudeList = id => {
  console.log('refIdrefIdrefId', id);
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_GRATITUDE_LIST_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const response = await RestClient.getCall(
        `gratefulLists?refId=${id}&createdBy=${userId}`,
        token,
      );
      console.log('response', response);
      if (response && response.code == 200) {
        dispatch({
          type: Types.GET_GRATITUDE_LIST_SUCCESS,
          payload: response.data && response.data[0],
        });
      } else {
        dispatch({type: Types.GET_GRATITUDE_LIST_FAIL});
      }
    } catch (error) {
      console.log('werror', error);
      dispatch({type: Types.GET_GRATITUDE_LIST_FAIL});
    }
  };
};
export const saveGratitude = (id, whyGrateful, description, cb) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.SAVE_GRATEFUL_LIST_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const requestPayload = {
        dailyRefId: id,
        createdBy: userId,
        gratefulTo: whyGrateful,
        journalText: description,
      };
      const response = await RestClient.postCall(
        `gratefulLists`,
        requestPayload,
        token,
      );
      if (response && response.code == 200) {
        dispatch({type: Types.SAVE_GRATEFUL_LIST_SUCCESS});
        dispatch(getGratitudeList(id));
        Helpers.toast('Your daily reflection is recorded successfully.');
        cb();
      } else {
        dispatch({type: Types.SAVE_GRATEFUL_LIST_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.SAVE_GRATEFUL_LIST_FAIL});
    }
  };
};
export const createUserProfile = requestPayload => {
  return async (dispatch, getState) => {
    dispatch({type: Types.CREATE_PROFILE_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const userType = getState().usersReducer.userDetails.userType;
      console.log('userTypeuserTypeuserType', userType, userType == 'mentee');
      const {
        birthday,
        gender,
        sobriety,
        location,
        goals,
        avatar,
        goalSupports,
        recoveringFromItems,
        experienceLevel,
      } = requestPayload;
      let userImage = {
        uri: avatar && avatar.uri,
        type: avatar && avatar.type,
        name: 'avatar.jpg',
      };
      let formdata = new FormData();

      formdata.append('birthday', birthday);
      formdata.append('gender', gender);
      formdata.append('sobriety', JSON.stringify(sobriety));
      formdata.append('location', JSON.stringify(location));
      formdata.append('avatar', userImage);
      formdata.append('goals', JSON.stringify(goals));
      formdata.append('goalSupports', JSON.stringify(goalSupports));
      formdata.append('isNewUser', false);
      formdata.append(
        'recoveringFromItems',
        JSON.stringify(recoveringFromItems),
      );
      if (userType == 'mentor')
        formdata.append('experienceLevel', experienceLevel);

      console.log('formdataformdata', formdata);
      const response = await RestClient.patchCall(
        `users/${userId}`,
        formdata,
        token,
      );
      if (response && response.code == 200) {
        Helpers.toast(response && response.message);
        dispatch({type: Types.CREATE_PROFILE_SUCCESS});
        dispatch(getUserDetails());
      } else {
        Helpers.toast(response && response.message);
        dispatch({type: Types.CREATE_PROFILE_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.CREATE_PROFILE_FAIL});
    }
  };
};
export const createTask = (requestPayload, cb) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.CREATE_TASK_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.postCall(
        `tasks`,
        requestPayload,
        token,
      );
      if (response && response.code == 200) {
        dispatch({type: Types.CREATE_TASK_SUCCESS});
        dispatch(getUserDetails());
        cb();
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.CREATE_TASK_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.CREATE_TASK_FAIL});
    }
  };
};
export const setCurrentStrike = () => {
  return async (dispatch, getState) => {
    dispatch({type: Types.SET_CURRENT_STRIKE_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const response = await RestClient.patchCall(
        `users/${userId}/setSobriety`,
        {},
        token,
      );
      if (response && response.code == 200) {
        dispatch({type: Types.SET_CURRENT_STRIKE_SUCCESS});
        dispatch(getUserDetails());
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.SET_CURRENT_STRIKE_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.SET_CURRENT_STRIKE_FAIL});
    }
  };
};
export const setTaskCompleted = (taskId, requestPayload) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.SET_TASK_COMPLETED_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.patchCall(
        `tasks/${taskId}`,
        requestPayload,
        token,
      );
      if (response && response.code == 200) {
        dispatch({type: Types.SET_TASK_COMPLETED_SUCCESS});
        dispatch(getUserDetails());
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.SET_TASK_COMPLETED_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.SET_TASK_COMPLETED_FAIL});
    }
  };
};

export const getLogs = date => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_LOGS_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const requestPayload = {
        userId: userId,
        date: date,
      };
      const response = await RestClient.postCall(`logs`, requestPayload, token);
      if (response && response.code == 200) {
        dispatch({type: Types.GET_LOGS_SUCCESS, payload: response.data});
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.GET_LOGS_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.GET_LOGS_FAIL});
    }
  };
};

export const setMood = mood => {
  return async (dispatch, getState) => {
    dispatch({type: Types.SET_MOOD_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const requestPayload = {
        createdBy: userId,
        title: mood,
      };
      const response = await RestClient.postCall(
        `moods`,
        requestPayload,
        token,
      );
      if (response && response.code == 200) {
        Helpers.toast(response.message);
        dispatch({type: Types.SET_MOOD_SUCCESS});
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.SET_MOOD_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.SET_MOOD_FAIL});
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_USERS_LIST_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.getCall(`users/getAllUsers`, token);
      if (response && response.code == 200) {
        dispatch({
          type: Types.GET_USERS_LIST_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_USERS_LIST_FAIL});
      }
    } catch (error) {
      console.log('werror', error);
      dispatch({type: Types.GET_USERS_LIST_FAIL});
    }
  };
};
