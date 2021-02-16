/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';
import RestClient from 'helpers/RestClient';
import Helpers from 'helpers/OtherHelper';
export const getActivities = () => {
  return async (dispatch, getState) => {
    dispatch({type: Types.GET_ALL_ACTIVITIES_REQUEST});
    try {
      const token = getState().authReducer.token;
      const userId = getState().authReducer.loginData.userId;
      const response = await RestClient.getCall(`activities/${userId}`, token);
      if (response && response.code == 200) {
        dispatch({
          type: Types.GET_ALL_ACTIVITIES_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_ALL_ACTIVITIES_FAIL});
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: Types.GET_ALL_ACTIVITIES_FAIL});
    }
  };
};
