/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';
import Helpers from 'helpers/OtherHelper';
import RestClient from 'helpers/RestClient';
import * as AppActions from 'actions';
export const getAdminGoals = cb => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_ADMIN_GOALS_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.getCall('goals/getAdminGoals', token);
      if (response && response.code == 200) {
        dispatch({type: Types.GET_ADMIN_GOALS_SUCCESS, payload: response});
        cb(response && response.data);
      } else {
        dispatch({type: Types.GET_ADMIN_GOALS_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.GET_ADMIN_GOALS_FAIL});
    }
  };
};
export const getSoberDates = () => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_SOBER_DATES_REQUEST});
    try {
      const token = getState().authReducer.token;
      const response = await RestClient.getCall(
        'sobriety/allSobrietyDays',
        token,
      );
      console.log('Response', response);
      if (response && response.code == 200) {
        dispatch({type: Types.GET_SOBER_DATES_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.GET_SOBER_DATES_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.GET_SOBER_DATES_FAIL});
    }
  };
};

export const createMilestone = (requestPayload, cb) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.CREATE_MILESTONE_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const payload = {...requestPayload, createdBy: userId};
      const response = await RestClient.postCall(
        'milestones/createUserMilestone',
        payload,
        token,
      );
      console.log('Response', response);
      if (response && response.code == 200) {
        dispatch({type: Types.CREATE_MILESTONE_SUCCESS, payload: response});
        dispatch(AppActions.getUserDetails());
        cb();
      } else {
        dispatch({type: Types.CREATE_MILESTONE_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.CREATE_MILESTONE_FAIL});
    }
  };
};

export const deleteMilestone = (milestoneId, goalId) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.DELETE_MILESTONE_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const response = await RestClient.deleteCall(
        `milestones/deleteUserMilestone/${milestoneId}?createdBy=${userId}&goalId=${goalId}`,
        token,
      );
      console.log('Response', response);
      if (response && response.code == 200) {
        dispatch({type: Types.DELETE_MILESTONE_SUCCESS, payload: response});
        dispatch(AppActions.getUserDetails());
      } else {
        dispatch({type: Types.DELETE_MILESTONE_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.DELETE_MILESTONE_FAIL});
    }
  };
};
