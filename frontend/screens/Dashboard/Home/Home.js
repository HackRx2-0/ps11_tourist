import React from "react";
import { TextInput, View } from 'react-native'
import { IconButton as Button, Text } from "react-native-paper"
import styles from "./styles";


const HomeRoute = () => {
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
		</View>
	)
}

export default HomeRoute;