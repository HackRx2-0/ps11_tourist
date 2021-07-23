import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: '100%',
		backgroundColor: '#23355F',
		padding: 10,
	},
	inp: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		backgroundColor: "#36497B",
		padding: 15,
		width: '85%'
	},
	searchBtn: {
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: "#36497B",
		margin: 0,
		width: '15%',
	},
	innerContainer: {
		flexDirection: 'row',
	}
});

export default styles;