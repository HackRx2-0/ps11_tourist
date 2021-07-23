import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	slide: {
		paddingHorizontal: 15,
		flexBasis: '100%',
		flex: 1,
		maxWidth: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	slideText: {
		paddingTop: 5,
		width: '100%',
		fontSize: 15,
		color: '#BBCFF4',
		textAlign: 'center'
	},
});

export default styles;