import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: '100%',
		alignItems: 'center',
		padding: 10
	},
	outerContainer: {
		backgroundColor: '#23355F',
	},
	header: {
		alignSelf: 'center',
		width: '100%',
		padding: 10,
		fontSize: 24,
		color: '#BBCFF4',
		// borderBottomWidth: 1,
		// borderColor: '#51669E',
	},
	prescription: {
		minWidth: '100%',
		backgroundColor: '#51669E',
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderTopRightRadius: 10,
		// padding: 10,
		marginVertical: 10
	},
	top_text: {
		fontFamily: 'RobotoBold-Xdoj',
		fontSize: 36,
		textAlign: 'center',
	},
	top_view: {
		padding: 50,
	},
	log_txt: {
		fontFamily: 'RobotoBold-Xdoj',
		fontSize: 36,
		textAlign: 'center',
	},
});

export default styles;