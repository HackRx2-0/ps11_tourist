// imports
import React, {useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {BottomNavigation, Text} from 'react-native-paper';
import {WebSocketContext} from '../../SocketWrapper';
//components
import HomeRoute from './Home/Home';
import HistoryRoute from './Calender/Calender';
import ConsultationRoute from './Plus/Plus';
import BookmarksRoute from './Book/Book';
import PrescriptionRoute from './Clipboard/Clipboard';
import UserScreen from '../UserScreen';
const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#51669E',
    overflow: 'hidden',
    borderColor: 'transparent',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
});

// Dashboard
const UserDashBoard = ({navigation}) => {
  const {connect} = useContext(WebSocketContext);
  useEffect(() => {
    connect();
  }, []);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'home', title: 'Home', icon: 'home-outline'},
    {key: 'history', title: 'History', icon: 'calendar-blank-outline'},
    {key: 'new_consultation', title: 'Consultation', icon: 'plus-box-outline'},
    {key: 'bookmarks', title: 'Bookmarks', icon: 'book'},
    {key: 'prescription', title: 'Prescription', icon: 'clipboard-outline'},
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    history: HistoryRoute,
    new_consultation: UserScreen,
    bookmarks: BookmarksRoute,
    prescription: PrescriptionRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      inactiveColor="#BBCFF4"
      barStyle={styles.bottomBar}
      style={{backgroundColor: '#23355F'}}
    />
  );
};

export default UserDashBoard;
