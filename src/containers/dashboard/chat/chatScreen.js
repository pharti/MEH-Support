/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions/appActions';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from 'components/common/header';

const {width, height} = Dimensions.get('window');

export const ChatScreen = props => {
  const {AppActions, componentId} = props;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer, How are you ??',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Header
          isBack={true}
          title={props.userData && props.userData.name}
          componentId={componentId}
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        alwaysShowSend={true}
        user={{
          _id: 1,
        }}
      />
    </>
  );
};
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);

const styles = StyleSheet.create({});
