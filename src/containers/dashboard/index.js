/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import Constants from 'constants';
import React, {Component, lazy} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TabBar from '../../components/common/tabs/tabBar';

import TabSwitcher, {TabPanel} from '../../components/common/tabs/tabSwitcher';
const Home = lazy(() => import('./home'));
const Chat = lazy(() => import('./chat'));
const AI = lazy(() => import('./ai'));
const Tracker = lazy(() => import('./tracker'));
const Profile = lazy(() => import('./profile'));

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {componentId} = this.props;
    console.log('componentIdcomponentId', componentId);
    return (
      <View style={Styles.homeContainer}>
        <TabSwitcher>
          <TabPanel whenActive="Home">
            <Home componentId={componentId} />
          </TabPanel>
          <TabPanel whenActive="Chat">
            <Chat componentId={componentId} />
          </TabPanel>
          <TabPanel whenActive="AI">
            <AI />
          </TabPanel>
          <TabPanel whenActive="Tracker">
            <Tracker />
          </TabPanel>
          <TabPanel whenActive="Profile">
            <Profile componentId={componentId} />
          </TabPanel>
          <TabBar />
        </TabSwitcher>
      </View>
    );
  }
}

const mapStateToProps = ({authReducer}) => ({
  isLoading: authReducer.isLoading,
});

const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);

const Styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  homeView: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
  headerTitleContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleTxt: {
    color: Constants.Colors.White,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
