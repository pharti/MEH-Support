'use strict';

import NetInfo from '@react-native-community/netinfo';
import {create} from 'apisauce';
import env from '../env';
console.log('ENV', env);
const api = create({
  baseURL: env.api.host, //TEST_API_URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

class RestClient {
  static isConnected() {
    return new Promise(function(fulfill, reject) {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) fulfill(isConnected);
        else {
          reject(isConnected);
        }
      });
    });
  }

  static getCall(url, token) {
    console.log(url, token, 'API=>>>>>>>>url');
    api.setHeader('Authorization', token);
    let context = this;
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.get(env.api.host + url).then(response => {
            console.log('get resonse', response);
            if (response.status === 401) {
              reject(response);
            }
            fulfill(response.data);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.warn('error', error);
        });
    });
  }

  static postCall(url, params?: {}, token) {
    api.setHeader('Authorization', token);
    console.log(api, url, params, '*******POST CALL*********');
    let context = this;
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.post(env.api.host + url, params).then(response => {
            console.log(response, 'responseresponseresponseresponse');
            if (response.status === 401) {
              reject(response);
            }
            fulfill(response.data);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.warn('eroro', error);
        });
    });
  }

  static putCall(url, params?: {}, token) {
    let context = this;
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.put(env.api.host + url, params).then(response => {
            console.log(response, 'responseresponseresponseresponse');
            if (response.status === 401) {
              reject(response);
            }
            fulfill(response.data);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.warn('eroro', error);
        });
    });
  }

  static patchCall(url, params?: {}, token) {
    console.log('tokentokentokentokentoken', token);
    api.setHeader('Authorization', token);
    let context = this;
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.patch(env.api.host + url, params).then(response => {
            console.log(response, 'responseresponseresponseresponse');
            if (response.status === 401) {
              reject(response);
            }
            fulfill(response.data);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.warn('eroro', error);
        });
    });
  }

  static deleteCall(url, token, params?: {}) {
    console.log('tokentokentokentokentoken', token);
    api.setHeader('Authorization', token);
    let context = this;
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.delete(env.api.host + url, params).then(response => {
            console.log(response, 'responseresponseresponseresponse');
            if (response.status === 401) {
              reject(response);
            }
            fulfill(response.data);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.warn('eroro', error);
        });
    });
  }
}

export default RestClient;
