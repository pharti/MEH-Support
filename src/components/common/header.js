// @ts-nocheck
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Constants from 'constants';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const Header = props => {
  const {
    componentId,
    isBack,
    title,
    trailingIcon,
    trailingButton,
    setSearchText,
    buttonTitle,
    alignTitleLeft,
    onPressButton,
  } = props;
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();
  const onPressLeading = () => {
    isBack
      ? dispatch(AppActions.pop(componentId))
      : Navigation.mergeOptions('SideMenu', {
          sideMenu: {
            left: {
              visible: true,
              width: width / 1.2,
            },
          },
        });
  };
  const _toggleInput = () => {
    setShowInput(!showInput);
  };
  return (
    <View
      style={{
        marginTop: Platform.OS == 'ios' ? RFValue(42) : RFValue(16),
        width: '100%',
        paddingBottom: RFValue(16),
        paddingHorizontal: RFValue(16),
        flexDirection: 'row',
        height: height / 16,
        alignItems: 'center',
        shadowColor: Constants.Colors.TEXT_COLOR,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
        backgroundColor: trailingButton ? Constants.Colors.WHITE : 'tranparent',
      }}>
      <View style={{flex: 0.1}}>
        {isBack ? (
          <TouchableOpacity
            onPress={() => {
              onPressLeading();
            }}>
            <Image source={Images.backArrow} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              onPressLeading();
            }}>
            <Image source={Images.Drawer} />
          </TouchableOpacity>
        )}
      </View>
      {showInput ? (
        <View style={styles.browseLocation}>
          <TextInput
            placeholder="Browse Groups"
            style={{color: Constants.Colors.TEXT_COLOR}}
            onChangeText={searchText => {
              setSearchText(searchText.toLowerCase());
            }}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              flex: 0.7,
              alignItems: alignTitleLeft ? 'flex-start' : 'center',
            }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{flex: 0.2}}>
            {trailingIcon && (
              <TouchableOpacity
                style={styles.trailingView}
                onPress={() => _toggleInput()}>
                <Image source={Images.search} />
              </TouchableOpacity>
            )}
            {trailingButton && (
              <TouchableOpacity
                style={{
                  paddingHorizontal: RFValue(16),
                  paddingVertical: RFValue(2),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Constants.Colors.PRIMARY,
                  borderRadius: RFValue(10),
                }}
                onPress={() => onPressButton()}>
                {false ? (
                  <ActivityIndicator color={Constants.Colors.WHITE} />
                ) : (
                  <Text
                    style={{
                      color: Constants.Colors.WHITE,
                      fontSize: RFValue(16),
                    }}>
                    {buttonTitle}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  constainer: {
    width: '100%',
    paddingBottom: RFValue(16),
    paddingHorizontal: RFValue(16),
    flexDirection: 'row',
    height: height / 16,
    alignItems: 'center',
  },
  browseLocation: {
    flex: 0.8,
    backgroundColor: Constants.Colors.BACKGROUND,
    height: 40,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: RFValue(16),
  },
  title: {
    fontSize: RFValue(18),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Medium,
  },
  trailingView: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
