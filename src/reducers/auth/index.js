/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  verifyingUser: false,
  forgotPwdRequest: false,
  changePwdRequest: false,
  loginData: {},
  signupData: {},
  token: null,
};
function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case Types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isLoggedIn: true,
        loginData: action.payload.data,
        token: action.payload.token,
      });
    case Types.LOGIN_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        isLoggedIn: false,
      });

    case Types.SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case Types.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        signupData: action.payload,
      });
    case Types.SIGNUP_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
      });

    case Types.VERIFY_OTP_REQUEST:
      return Object.assign({}, state, {
        verifyingUser: true,
      });
    case Types.VERIFY_OTP_SUCCESS:
      return Object.assign({}, state, {
        verifyingUser: false,
      });
    case Types.VERIFY_OTP_FAIL:
      return Object.assign({}, state, {
        verifyingUser: false,
      });

    case Types.FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        forgotPwdRequest: true,
      });
    case Types.FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        forgotPwdRequest: false,
      });
    case Types.FORGOT_PASSWORD_FAIL:
      return Object.assign({}, state, {
        forgotPwdRequest: false,
      });

    case Types.CHANGE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        changePwdRequest: true,
      });
    case Types.CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        changePwdRequest: false,
      });
    case Types.CHANGE_PASSWORD_FAIL:
      return Object.assign({}, state, {
        changePwdRequest: false,
      });
    case Types.LOGOUT:
      return Object.assign({}, state, {
        ...state,
        isLoggedIn: false,
        loginData: null,
        token: null,
      });
    default:
      return state;
  }
}
export default authReducer;
