/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Card from 'components/common/card';
import PopHeader from 'components/common/popHeader';
import Constants from 'constants';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import Helpers from 'helpers/OtherHelper';
const {width, height} = Dimensions.get('window');
export const AddReflections = props => {
  let {componentId} = props;
  const dispatch = useDispatch();
  const [reflectionImage, setReflectionImage] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [whyGrateful, setWhyGrateful] = useState('');
  const addingGratefulList = useSelector(
    state => state.usersReducer.addingGratefulList,
  );
  const getReflectionLoading = useSelector(
    state => state.usersReducer.getReflectionLoading,
  );
  const reflectionDetail = useSelector(
    state => state.usersReducer.reflectionDetail,
  );
  const journalDetail = useSelector(state => state.usersReducer.journalDetail);
  useEffect(() => {
    if (reflectionDetail) {
      const {_id, refTitle, refImage} = reflectionDetail;
      setReflectionImage(refImage);
      setTitle(refTitle);
      if (journalDetail) {
        setWhyGrateful(journalDetail.gratefulTo);
        setDescription(journalDetail.journalText);
      }
    }
  }, [reflectionDetail, journalDetail]);

  const _saveGratitude = () => {
    Keyboard.dismiss();
    const {_id} = reflectionDetail;
    console.log(
      "whyGrateful != '' && description != ''",
      whyGrateful,
      description,
      whyGrateful != '' && description != '',
    );
    if (whyGrateful != '' && description != '') {
      dispatch(
        AppActions.saveGratitude(_id, whyGrateful, description, () => {
          dispatch(AppActions.pop(componentId));
        }),
      );
    } else {
      Helpers.toast(
        'Please write your reflection and what are you grateful for.',
      );
    }
  };
  return (
    <>
      <KeyboardAwareScrollView
        style={{backgroundColor: Constants.Colors.BACKGROUND}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: RFValue(16),
          paddingBottom: '8%',
        }}
        keyboardShouldPersistTaps="always">
        <PopHeader componentId={props.componentId} />
        {getReflectionLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{height: '85%'}}>
            <Text
              style={{
                paddingHorizontal: RFValue(16),
                fontSize: RFValue(16),
                color: Constants.Colors.TEXT_COLOR,
                fontFamily: Constants.Fonts.Regular,
                alignSelf: 'center',
              }}>
              {moment().format('ll')}
            </Text>
            <Text
              style={{
                paddingHorizontal: RFValue(16),
                paddingBottom: RFValue(8),
                paddingTop: RFValue(8),
                fontSize: RFValue(20),
                color: Constants.Colors.TEXT_COLOR,
                fontFamily: Constants.Fonts.Regular,
                alignSelf: 'center',
              }}>
              Daily Reflections
            </Text>
            <Card
              customStyle={{
                padding: RFValue(16),
                marginTop: RFValue(16),
              }}>
              <View
                style={{
                  backgroundColor: '#F0F0F0',
                  height: RFValue(176),
                  borderRadius: RFValue(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}>
                {reflectionImage ? (
                  <Image
                    source={{uri: reflectionImage.uri || reflectionImage}}
                    style={{height: '100%', width: '100%'}}
                    resizeMode="cover"
                  />
                ) : (
                  <Image source={Images.dummyReflection} resizeMode="contain" />
                )}
              </View>
              <Text
                style={{
                  color: Constants.Colors.TEXT_COLOR,
                  paddingHorizontal: RFValue(16),
                  borderRadius: RFValue(8),
                  fontSize: RFValue(16),
                  paddingTop: RFValue(8),
                  marginVertical: RFValue(16),
                  textAlign: 'center',
                }}>
                {title}
              </Text>
              <TextInput
                placeholder="Type your reflections here..."
                style={{
                  color: Constants.Colors.TEXT_COLOR,
                  backgroundColor: Constants.Colors.BACKGROUND,
                  paddingHorizontal: RFValue(16),
                  borderRadius: RFValue(8),
                  height: RFValue(124),
                  fontSize: RFValue(12),
                  paddingTop: RFValue(8),
                }}
                value={description}
                selectionColor={Constants.Colors.PRIMARY}
                multiline
                onChangeText={description => {
                  setDescription(description);
                }}
              />
            </Card>
            <Card
              customStyle={{
                padding: RFValue(16),
                marginTop: RFValue(16),
              }}>
              <Text
                style={{
                  paddingHorizontal: RFValue(16),
                  paddingBottom: RFValue(16),
                  fontSize: RFValue(16),
                  color: Constants.Colors.TEXT_COLOR,
                  fontFamily: Constants.Fonts.Regular,
                  alignSelf: 'center',
                }}>
                I am grateful for…
              </Text>
              <TextInput
                placeholder="Write what you are grateful for here…"
                placeholderTextColor={Constants.Colors.PLACEHOLDER}
                style={{
                  color: Constants.Colors.TEXT_COLOR,
                  backgroundColor: Constants.Colors.BACKGROUND,
                  paddingHorizontal: RFValue(16),
                  borderRadius: RFValue(8),
                  height: RFValue(124),
                  fontSize: RFValue(12),
                  paddingTop: RFValue(8),
                }}
                selectionColor={Constants.Colors.PRIMARY}
                multiline
                onChangeText={whyGrateful => {
                  setWhyGrateful(whyGrateful);
                }}
                value={whyGrateful}
              />
            </Card>
            <TouchableOpacity
              style={{
                margin: RFValue(16),
                height: height / 14,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Constants.Colors.PRIMARY,
                borderRadius: RFValue(10),
              }}
              onPress={() => _saveGratitude()}>
              {addingGratefulList ? (
                <ActivityIndicator color={Constants.Colors.WHITE} />
              ) : (
                <Text
                  style={{
                    color: Constants.Colors.WHITE,
                    fontSize: RFValue(16),
                  }}>
                  Add Reflections
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAwareScrollView>
    </>
  );
};
export default AddReflections;
const styles = StyleSheet.create({});
