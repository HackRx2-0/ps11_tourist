import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { TextInput, View } from 'react-native'
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
      <Text>Welcome, UserName</Text>
      <Text>How are you feeling today</Text>
      <View style={styles.innerContainer}>
        <TextInput placeholder="Doctors,Symptoms,Clinic" style={styles.inp}>
        </TextInput>
        <Button
          size={40}
          icon="magnify"
          style={styles.searchBtn}
          color='#FFF'
        />
      </View>
      <Button
        size={40}
        icon="camera"
        style={styles.searchBtn}
        color='#FFF'
        onPress={async () => logout()}
      />
    </View>
  )
}

export default HomeRoute;