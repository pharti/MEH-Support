/* eslint-disable module-resolver/use-alias */
import withRedux from '../hoc/withRedux';
import {lazy} from 'react';
import {Navigation} from 'react-native-navigation';
import Loader from 'containers/app';
const LandingPage = lazy(() => import('containers/auth/landingPage'));
const Login = lazy(() => import('containers/auth/login'));
const Register = lazy(() => import('containers/auth/register'));
const ForgotPassword = lazy(() => import('containers/auth/forgotPassword'));
const ChangePassword = lazy(() => import('containers/auth/changePassword'));
const VerifyOTP = lazy(() => import('containers/auth/verifyOTP'));

const DashBoard = lazy(() => import('containers/dashboard'));
const Home = lazy(() => import('containers/dashboard/home'));
const SideMenu = lazy(() => import('components/common/sideMenu'));
const TakeATour = lazy(() => import('containers/dashboard/takeATour'));
const AddReflections = lazy(() =>
  import('containers/dashboard/home/dailyReflections/addReflections'),
);
const AddTask = lazy(() =>
  import('containers/dashboard/home/todaysTask/addTask'),
);
const AddGoals = lazy(() => import('containers/dashboard/home/goals/addGoals'));
const EditProfile = lazy(() =>
  import('../containers/dashboard/profile/editProfile'),
);
const GroupFeeds = lazy(() => import('containers/dashboard/chat/group'));
const GroupDetails = lazy(() =>
  import('containers/dashboard/chat/group/detail'),
);

const ChatScreen = lazy(() => import('containers/dashboard/chat/chatScreen'));
const BrowseGroups = lazy(() =>
  import('containers/dashboard/chat/group/browseGroups'),
);
const Settings = lazy(() => import('containers/settings'));
const SharingPrivacy = lazy(() => import('containers/settings/sharingPrivacy'));
const WarningSigns = lazy(() => import('containers/settings/warningSigns'));
const Activities = lazy(() => import('containers/dashboard/chat/activities'));
const CreatePost = lazy(() =>
  import('containers/dashboard/chat/group/createPost'),
);

export const registerScreens = (store, Provider) => {
  const withReduxStore = withRedux(store);
  // Basic registration of components without any refrence as they are independent of application state
  Navigation.registerComponentWithRedux(
    'Loader',
    () => Loader,
    Provider,
    store,
  );
  // Components that need refrence and need to have access to global context
  Navigation.registerComponentWithRedux(
    'LandingPage',
    withReduxStore(LandingPage),
  );
  Navigation.registerComponentWithRedux('SideMenu', withReduxStore(SideMenu));

  Navigation.registerComponentWithRedux('Login', withReduxStore(Login));
  Navigation.registerComponentWithRedux('Register', withReduxStore(Register));
  Navigation.registerComponentWithRedux(
    'ForgotPassword',
    withReduxStore(ForgotPassword),
  );
  Navigation.registerComponentWithRedux(
    'ChangePassword',
    withReduxStore(ChangePassword),
  );
  Navigation.registerComponentWithRedux('VerifyOTP', withReduxStore(VerifyOTP));

  Navigation.registerComponentWithRedux('Dashboard', withReduxStore(DashBoard));
  Navigation.registerComponentWithRedux('Home', withReduxStore(Home));
  Navigation.registerComponentWithRedux('TakeATour', withReduxStore(TakeATour));
  Navigation.registerComponentWithRedux(
    'AddReflections',
    withReduxStore(AddReflections),
  );
  Navigation.registerComponentWithRedux('AddTask', withReduxStore(AddTask));
  Navigation.registerComponentWithRedux('AddGoals', withReduxStore(AddGoals));
  Navigation.registerComponentWithRedux(
    'EditProfile',
    withReduxStore(EditProfile),
  );

  Navigation.registerComponentWithRedux(
    'GroupFeeds',
    withReduxStore(GroupFeeds),
  );
  Navigation.registerComponentWithRedux(
    'ChatScreen',
    withReduxStore(ChatScreen),
  );
  Navigation.registerComponentWithRedux(
    'BrowseGroups',
    withReduxStore(BrowseGroups),
  );
  Navigation.registerComponentWithRedux('Settings', withReduxStore(Settings));
  Navigation.registerComponentWithRedux(
    'SharingPrivacy',
    withReduxStore(SharingPrivacy),
  );
  Navigation.registerComponentWithRedux(
    'WarningSigns',
    withReduxStore(WarningSigns),
  );
  Navigation.registerComponentWithRedux(
    'Activities',
    withReduxStore(Activities),
  );

  Navigation.registerComponentWithRedux(
    'CreatePost',
    withReduxStore(CreatePost),
  );
  Navigation.registerComponentWithRedux(
    'GroupDetails',
    withReduxStore(GroupDetails),
  );
};
