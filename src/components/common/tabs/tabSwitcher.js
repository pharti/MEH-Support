import React, {Component, createContext} from 'react';
import {TouchableOpacity} from 'react-native';
const context = createContext({});
const {Provider, Consumer} = context;
const Tab = ({id, children, tabSelected}) => {
  return (
    <Consumer>
      {({changeTab}) => (
        <TouchableOpacity
          onPress={() => {
            changeTab(id);
            tabSelected();
          }}>
          {children}
        </TouchableOpacity>
      )}
    </Consumer>
  );
};
const TabPanel = ({whenActive, children}) => {
  return (
    <Consumer>
      {({activeTabId}) => (activeTabId === whenActive ? children : null)}
    </Consumer>
  );
};
class TabSwitcher extends Component {
  state = {
    activeTabId: 'Home',
  };
  changeTab = newTabId => {
    this.setState({
      activeTabId: newTabId,
    });
  };
  render() {
    return (
      <Provider
        value={{
          activeTabId: this.state.activeTabId,
          changeTab: this.changeTab,
        }}>
        {this.props.children}
      </Provider>
    );
  }
}

export default TabSwitcher;
export {Tab, TabPanel};
