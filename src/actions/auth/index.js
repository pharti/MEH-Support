/* eslint-disable module-resolver/use-alias */
import {goHome, goToAuth} from 'config';
import * as Types from 'constants/actionsTypes';
import Helpers from 'helpers/OtherHelper';
import RestClient from 'helpers/RestClient';
export const login = (payload, componentId) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.LOGIN_REQUEST});
    try {
      const response = await RestClient.postCall('login', payload, true);
      if (response && response.code == 200) {
        dispatch({type: Types.LOGIN_SUCCESS, payload: response});
        goHome();
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.LOGIN_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.LOGIN_FAIL});
    }
  };
};

export const signUp = (requestPayload, cb) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.SIGNUP_REQUEST});
    try {
      const response = await RestClient.postCall(
        'signUp',
        requestPayload,
        true,
      );
      if (response && response.code == 200) {
        Helpers.toast(response && response.message);
        dispatch({type: Types.SIGNUP_SUCCESS, payload: requestPayload});
        cb();
      } else {
        console.log('response', response);
        Helpers.toast(response && response.message);
        dispatch({type: Types.SIGNUP_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.SIGNUP_FAIL});
    }
  };
};
export const verifyOTP = (requestPayload, cb) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.VERIFY_OTP_REQUEST});
    try {
      const response = await RestClient.postCall(
        'emailVerification',
        requestPayload,
        true,
      );
      console.log('Response', response);
      if (response && response.code == 200) {
        Helpers.toast(response.message);
        dispatch({type: Types.VERIFY_OTP_SUCCESS});
        cb();
      } else {
        Helpers.toast(response.message);
        dispatch({type: Types.VERIFY_OTP_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.VERIFY_OTP_FAIL});
    }
  };
};
export const forgotPassword = (requestPayload, cb) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.FORGOT_PASSWORD_REQUEST});
    try {
      const response = await RestClient.postCall(
        'forgetPassword',
        requestPayload,
        true,
      );
      if (response && response.code == 200) {
        dispatch({type: Types.FORGOT_PASSWORD_SUCCESS});
        cb(response);
      } else {
        Helpers.toast(response && response.message);
        dispatch({type: Types.FORGOT_PASSWORD_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.FORGOT_PASSWORD_FAIL});
    }
  };
};

export const changePassword = (requestPayload, cb) => {
  return async (dispatch, getState) => {
    dispatch({type: Types.CHANGE_PASSWORD_REQUEST});
    try {
      const response = await RestClient.postCall(
        'changePassword',
        requestPayload,
        true,
      );
      if (response && response.code == 200) {
        dispatch({type: Types.CHANGE_PASSWORD_SUCCESS});
        cb(response);
      } else {
        dispatch({type: Types.CHANGE_PASSWORD_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.CHANGE_PASSWORD_FAIL});
    }
  };
};
export const logout = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: Types.LOGOUT});
      goToAuth();
    } catch (error) {
      dispatch({type: Types.LOGOUT_FAIL});
    }
  };
};
