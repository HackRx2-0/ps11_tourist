import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'

const Slide = (props) => {

	const { label, value, imgPath } = props;

	return (
		<View style={styles.slide}>
			<Image source={imgPath} />
			<Text style={styles.slideText}>
				{label}
			</Text>
		</View>
	);
}

export default Slide;