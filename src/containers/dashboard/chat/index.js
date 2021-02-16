/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions/appActions';
import Constants from 'constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ChatUser from './chatUser';
export const Chat = props => {
  const dispatch = useDispatch();
  let {componentId} = props;

  return (
    <View style={styles.wrapper}>
      <ChatUser componentId={componentId} />
    </View>
  );
};
export default Chat;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Constants.Colors.WHITE,
  },
});
