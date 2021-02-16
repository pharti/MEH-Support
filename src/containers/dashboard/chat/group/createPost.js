/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Header from 'components/common/header';
import {useKeyboard} from 'components/customHooks/keyboard';
import Constants from 'constants';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const CreatePost = props => {
  const {componentId, groupId} = props;
  const dispatch = useDispatch();
  const [post, setPost] = useState('');
  const [postImage, setPostImage] = useState('');
  const [keyboardHeight] = useKeyboard();
  const groupDetail = useSelector(state => state.groupsReducer.groupDetail);
  const userDetails = useSelector(state => state.usersReducer.userDetails);
  const _openImagePicker = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        setPostImage(response);
      },
    );
  };
  const _onCreatePost = () => {
    if (post) {
      const requestPayload = {
        image: postImage,
        groupId: groupDetail && groupDetail._id,
        message: post,
      };
      dispatch(AppActions.createPost(requestPayload));
      setPost('');
      setPostImage('');
      dispatch(AppActions.pop(componentId));
    }
  };
  return (
    <>
      <Header
        isBack={true}
        title={groupDetail && groupDetail.title}
        componentId={componentId}
        trailingButton={true}
        buttonTitle={'Post'}
        alignTitleLeft={true}
        onPressButton={_onCreatePost}
      />
      <View style={{flex: 0.2}}>
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          placeholder="Type here to create your post..."
          placeholderTextColor={Constants.Colors.PLACEHOLDER}
          style={{
            height: height / 4,
            color: Constants.Colors.TEXT_COLOR,
            padding: RFValue(16),
            marginTop: RFValue(16),
            fontSize: RFValue(16),
          }}
          onChangeText={post => {
            setPost(post);
          }}
          value={post}
        />
      </View>
      <View style={{flex: 0.5, marginHorizontal: RFValue(16)}}>
        {postImage && postImage.uri ? (
          <View
            style={{
              height: RFValue(32),
              width: RFValue(32),
              backgroundColor: Constants.Colors.Grey,
            }}>
            <Image
              source={{uri: postImage.uri}}
              style={{
                height: RFValue(124),
                width: width / 1.5,
                borderRadius: RFValue(4),
              }}
              resizeMode="cover"
            />
          </View>
        ) : null}
      </View>
      <View
        style={{
          height: '8%',
          width: width,
          position: 'absolute',
          bottom: 0 + keyboardHeight,
          flexDirection: 'row',
          paddingHorizontal: RFValue(16),
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopEndRadius: RFValue(16),
          borderTopLeftRadius: RFValue(16),
          shadowColor: Constants.Colors.TEXT_COLOR,
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 4,
          elevation: 4,
          backgroundColor: Constants.Colors.WHITE,
        }}>
        <View
          style={{
            flex: 0.7,
            paddingHorizontal: RFValue(4),
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: RFValue(14),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
            }}>
            Add to you post
          </Text>
        </View>
        <View
          style={{
            flex: 0.15,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => _openImagePicker()}>
            <Image
              source={Images.camera}
              style={{width: RFValue(25), height: RFValue(18)}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default CreatePost;
const styles = StyleSheet.create({});
