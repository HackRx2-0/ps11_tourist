import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper"
import RazorpayCheckout from 'react-native-razorpay'
import styles from "../../styles/styles"

const BookRoute = () => {

	async function displayRazorPay() {
		const data = await fetch('https://3e8d51790b3b.ngrok.io/api/payment', { method: 'POST' }).then((t) =>
			t.json()
		)
		var options = {
			key: 'rzp_test_efCADVgg8VMqeR',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,//Replace this with an order_id created using Orders API.
			name: 'Acme Corp',
			description: 'Credits towards consultation',
			image: 'https://i.imgur.com/3g7nmJC.png',
			prefill: {
				email: 'gaurav.kumar@example.com',
				contact: '9191919191',
				name: 'Gaurav Kumar'
			},
			theme: { color: '#23355F' }
		}
		RazorpayCheckout.open(options)
			.then((data) => {
				// handle success
				alert(`Success: ${data.razorpay_payment_id}`);
			})
			.catch((error) => {
				// handle failure
				alert(`Error: ${error.code} | ${error.description}`);
			});
	}

	return (
		<View>
			<Text onPress={() => displayRazorPay()}>Pay</Text>
		</View>

	)
}

export default BookRoute;