import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Headerbar } from "../Components/Header";
import { AuthContext } from "../Components/AuthContext";
import updateUseEffect from "../Components/CustomUseEffect";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = ({ navigation, route }) => {
	const { Card, setCard, howMany, sethowMany, key } = useContext(AuthContext);
	const name = route.params.names;
	const price = route.params.prices;
	const image = route.params.images;
	const description = route.params.descriptions;
	const [valid, setvalid] = useState(false);
	const [isAlreadyAdded, setAlreadyAdded] = useState(false);
	const [Count, setCount] = useState(1);

	useEffect(() => {
		if (Card) {
			const ISinclude = Card.map((i) => name == i.name);
			setAlreadyAdded(ISinclude.includes(true));
		}
	});

	// console.log(name, price, description, image);
	updateUseEffect(() => {
		const store = async () => {
			// console.log("ji");
			// console.log({ key: key, AddToCard: Card, AddToCardQuantity: howMany });
			// AsyncStorage.getItem(key, (err, res) => {
			// 	console.log(res);
			// });
			await AsyncStorage.mergeItem(
				key,
				JSON.stringify({
					AddToCard: Card,
					Items: howMany,
				})
				// () =>
				// 	AsyncStorage.getItem(key, (err, res) => {
				// 		console.log(res);
				// })

				// console.log({
				// 	AddToCard: Card,
				// 	Items: Card ? howMany : 0,
				// })
				// () => {
				// 	AsyncStorage.getItem(key, (err, res) => {
				// 		console.log(res);
				// 	});
				// }
			);
		};
		store();
	}, [Card]);

	return (
		<>
			<Headerbar ScreenName={"Details"} />

			<View style={{ flex: 1, paddingHorizontal: 15 }}>
				<View style={{ alignItems: "flex-start", justifyContent: "center" }}>
					<Text style={{ fontSize: 22, fontWeight: "bold", padding: 10 }}>
						Details
					</Text>
				</View>
				<View style={{ flex: 0.4 }}>
					<Image
						onError={() => setvalid(true)}
						style={{
							resizeMode: "contain",
							height: "100%",
							width: "100%",
							borderRadius: 10,
						}}
						source={
							valid
								? require("../assets/Image_not_available.png")
								: {
										uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
								  }
						}
					/>
				</View>
				<View style={{ flex: 0.5 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}>
						<Text
							style={{ fontSize: 22, fontWeight: "bold", paddingVertical: 10 }}>
							{name}
						</Text>
					</View>

					<Text style={{ fontSize: 20, fontWeight: "bold" }}>${price}</Text>
					<Text style={{ fontSize: 18, paddingVertical: 5 }}>
						{description}
					</Text>
				</View>
			</View>

			{isAlreadyAdded ? (
				<TouchableOpacity
					onPress={() => (
						sethowMany(howMany - 1),
						setCard(Card.filter((x) => x.name !== name))
					)}>
					<View
						style={{
							backgroundColor: "yellow",
							borderRadius: 10,
							alignItems: "center",
							justifyContent: "center",
							margin: 20,
						}}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "700",
								paddingHorizontal: 10,
								paddingVertical: 15,
							}}>
							Remove from Card
						</Text>
					</View>
				</TouchableOpacity>
			) : (
				<>
					<View
						style={{
							flexDirection: "row",
							alignSelf: "center",
							justifyContent: "space-between",
							width: "20%",
							alignItems: "center",
						}}>
						<Text onPress={() => setCount(Count - 1)} style={{ fontSize: 30 }}>
							--
						</Text>
						<Text style={{ fontSize: 25 }}>{Count}</Text>
						<Text onPress={() => setCount(Count + 1)} style={{ fontSize: 30 }}>
							+
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => (
							sethowMany(howMany + 1),
							Card
								? setCard([
										...Card,
										{
											name: name,
											price: price[0],
											image: image[0],
											description: description[0],
											Quantity: Count,
										},
								  ])
								: setCard([
										{
											name: name,
											price: price[0],
											image: image[0],
											description: description[0],
											Quantity: Count,
										},
								  ])
						)}>
						<View
							style={{
								backgroundColor: "yellow",
								borderRadius: 10,
								alignItems: "center",
								justifyContent: "center",
								margin: 20,
							}}>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "700",
									paddingHorizontal: 10,
									paddingVertical: 15,
								}}>
								Add to Card ${price * Count}
							</Text>
						</View>
					</TouchableOpacity>
				</>
			)}
		</>
	);
};

export default Details;
