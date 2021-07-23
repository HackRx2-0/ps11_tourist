import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	statsHead: {
		paddingTop: 10,
		paddingHorizontal: 12,
	},
	container: {
		width: '100%',
		backgroundColor: 'transparent',
		marginTop: 10,
	},
	scrollView: {
		display: 'flex',
		flexDirection: 'row',
		overflow: 'hidden',
	},
	bullets: {
		alignSelf: 'center',
		display: 'flex',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingTop: 10,
	},
	bullet: {
		paddingHorizontal: 5,
		fontSize: 25,
		color: '#fff',
		fontWeight: '900'
	}
});

export default styles;