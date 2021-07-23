import axios from "axios";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import { Text } from "react-native-paper"
import styles from "../../styles/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';

// await AsyncStorage.getItem('@storage_Key')

const IndividualPrescription = (props) => {
	return (
		<View style={styles.prescription}>
			<Image source={require('../../../assets/prescription.png')} />
			<View style={{ padding: 10 }}>
				<Text>Prescription</Text>
				<Text>
					<Text>By: {props.data.from_doctor}</Text>
					<Text> {props.data.createdAt}</Text>
				</Text>
			</View>
		</View>
	)
}

const arra = [1, 2, 3, 4, 5, 6, 7, 8]

const prescriptionComponent = (props) => {
	return (
		<View style={{ overflow: 'visible' }}>
			{
				props.map((data, id) => (
					<IndividualPrescription
						key={id}
						data={data}
					/>
				))
			}
		</View>
	)
}

const ClipRoute = () => {
	var [pres, setPres] = React.useState(null)
	const getPrescriptions = (token) => {
		const url = `https://223518336b3c.ngrok.io/api/prescription?token=${token}`
		axios.get(url)
			.then((res) => {
				setPres(prescriptionComponent(res.data.res))
			})
			.catch((err) => {
				console.warn(err)
			})
	}

	React.useEffect(() => {
		const token = AsyncStorage.getItem('jwt')
		getPrescriptions(token)
	}, [])

	return (
		<View style={styles.outerContainer}>
			<Text style={styles.header}>Your Prescriptions</Text>
			<ScrollView
				style={{ height: '100%', }}
			>
				<View style={styles.container}>
					{pres}
				</View>
			</ScrollView>
		</View>
	)
}

export default ClipRoute;