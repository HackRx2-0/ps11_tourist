import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { TextInput, View, Image } from 'react-native'
import { IconButton as Button, Text } from "react-native-paper"
import { useDispatch } from "react-redux";
import { REMOVE_TOKEN } from "../../../redux/Actions/types";
import styles from "./styles";


const HomeRoute = () => {
  const dispatch = useDispatch()
  async function logout() {
    await AsyncStorage.removeItem('jwt')
    dispatch({ type: REMOVE_TOKEN })
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Button
          size={30}
          icon="menu"
          style={{ margin: 0, padding: 0, backgroundColor: '#23355F' }}
          color='#BBCFF4'
        // onPress={() => naviga}
        />
        <Text style={{ textAlignVertical: 'center', alignSelf: 'center' }}>Location</Text>
        <Button
          size={20}
          icon="exit-to-app"
          style={{ padding: 0, backgroundColor: '#36497B' }}
          color='#FFF'
          onPress={async () => await AsyncStorage.removeItem('jwt')}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text>Welcome, UserName</Text>
          <Text>How are you feeling today</Text>
        </View>

      </View>
      <View style={styles.innerContainer}>
        <TextInput
          placeholder="Doctors,Symptoms,Clinic"
          style={styles.inp}></TextInput>
        <Button
          size={40}
          icon="magnify"
          style={styles.searchBtn}
          color="#FFF"
        />
      </View>
      <Image
        style={{ marginTop: 10 }}
        source={require('../../../assets/dashboardBanner.png')}
      />
      <View
        style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}
      >
        <Image
          style={{ marginHorizontal: 10 }}
          source={require('../../../assets/heart.png')}
        />
        <Image
          style={{ marginHorizontal: 10 }}
          source={require('../../../assets/teeth.png')}
        />
        <Image
          style={{ marginHorizontal: 10 }}
          source={require('../../../assets/ent.png')}
        />
      </View>
    </View>
  )
}

export default HomeRoute;