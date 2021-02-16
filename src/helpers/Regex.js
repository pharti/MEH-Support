/* eslint-disable */
'use strict';
import Helpers from 'helpers/OtherHelper';
var Regex = {
  validateEmail: function(val) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val,
    );
  },
  validateEmoji: function(text) {
    var reg = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;
    return reg.test(text);
  },
  validateMobile: function(text) {
    return /^(?:[0-9] ?){6,14}[0-9]$/.test(text);
  },
  validateMobileWithoutCC: function(val) {
    return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(
      val,
    );
  },
  validateString: function(val) {
    return /^[a-zA-Z\x20]{3,25}$/.test(val);
  },
  validateStringMinimumLength2: function(val) {
    return /^[a-zA-Z\x20]{2,25}$/.test(val);
  },
  validatePassword: function(val) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/.test(
      val,
    );
    //return /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_]\S{5,16}$/.test(val);
    //return^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val);
    //return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(val);
    // return /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$/.test(val);
  },
  validateNumbers: function(val) {
    return /^[0-9]{0,}$/.test(val);
  },
  validateURL: function(url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url,
    );
  },
  validatePrice(val) {
    return /^(\d*([.,](?=\d{1}))?\d+)?$/.test(val);
  },
  validateAlphaNumberic(val) {
    return /^[a-zA-Z0-9]*$/.test(val);
  },
  getNumbericValuesFromString(val) {
    return val.match(/^\d+|\d+\b|\d+(?=\w)/g);
  },
  validateDecimalNumbers(val) {
    return /^((\d|[1-9]\d+)(\.\d{0,1})?|\.\d{0,1})$/.test(val);
  },
  validateAddress: function(text) {
    return text.length > 200 ? false : true;
  },
  removeTrailingZeros(amount) {
    amount = amount.toString();
    let regEx1 = /^[0]+/; // remove zeros from start.
    let regEx2 = /[0]+$/; // to check zeros after decimal point
    let regEx3 = /[.]$/; // remove decimal point.
    if (amount.indexOf('.') > -1) {
      amount = amount.replace(regEx2, ''); // Remove trailing 0's
      amount = amount.replace(regEx3, '');
    }
    return parseFloat(amount).toFixed(2);
  },
  validateCreateProfile(
    userAvatar,
    startDate,
    selectedGoal,
    selectedSupport,
    recoveryItems,
    userType,
  ) {
    if (userAvatar == null) {
      Helpers.toast('Please upload you profile picture.');
      return;
    } else if (startDate == null) {
      Helpers.toast('Please select a sober date.');
      return;
    } else if (recoveryItems == null || recoveryItems.length == 0) {
      Helpers.toast('Please select what you have recovered or recovering.');
      return;
    } else {
      if (userType == 'mentee') {
        if (selectedGoal == null || selectedGoal.length == 0) {
          Helpers.toast('Please select your goals you want to achieve.');
          return;
        } else if (selectedSupport == null || selectedSupport.length == 0) {
          Helpers.toast(
            'Please select supports you want with, to achieve your goals.',
          );
          return;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  },
};

module.exports = Regex;
