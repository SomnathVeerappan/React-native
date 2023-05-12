import React, { useContext, useState } from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { AuthContext } from "../Components/AuthContext";
import { Headerbar } from "../Components/Header";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AddCard() {
	const { Card, setCard, FlatListData } = useContext(AuthContext);
	const [valid, setvalid] = useState(false);

	const Navigator = useNavigation();
	// console.log(FlatListData);
	const price = Card
		? Card.reduce((a, v) => a + Number(v.price) * Number(v.Quantity), 0)
		: 0;
	const Totalprice = price.toString().substring(0, 4);

	const AddMore = ({ id, name, price, image, description }) => {
		// console.log(description[0].substring(0, 40));
		return (
			<Pressable
				style={{
					marginHorizontal: 15,
					backgroundColor: "#EE9972",
					padding: 5,
					borderRadius: 10,
					// height: 50,
				}}
				onPress={() =>
					Navigator.navigate("Details", {
						names: name,
						prices: price,
						images: image,
						descriptions: description,
					})
				}>
				<View style={{ paddingVertical: 10 }}>
					<Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
						{name}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						marginBottom: 10,
						alignItems: "center",
					}}>
					<View style={{ marginRight: 10 }}>
						<Text style={{ fontSize: 20, color: "white" }} numberOfLines={2}>
							{description[0].substring(0, 20) + "..."}
						</Text>
						<Text style={{ fontSize: 20, marginTop: 5, color: "white" }}>
							${price}
						</Text>
					</View>
					<View>
						<Image
							onError={() => setvalid(true)}
							style={{
								resizeMode: "cover",
								height: 50,
								width: 60,
								paddingLeft: 10,
								borderRadius: 8,
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
				</View>
			</Pressable>
		);
	};

	const Item = ({ items }) => {
		const Removeitem = ({ name, Quantity }) => {
			// console.log(name);
			const data = Card ? Card.filter((i) => i.name == name) : null;
			const oldData = Card ? Card.filter((i) => i.name !== name) : null;
			setCard(
				data[0].Quantity === 1
					? Card
						? Card.filter((i) => i.name !== name)
						: null
					: [...oldData, { ...data[0], Quantity: items.item.Quantity - 1 }]
			);
		};

		return (
			<View
				style={{
					borderBottomWidth: 1,
					borderBottomColor: "lightgrey",
					marginHorizontal: 15,
					justifyContent: "space-between",
					flexDirection: "row",
				}}>
				<View
					style={{
						paddingVertical: 10,
						flexDirection: "row",
						alignItems: "center",
					}}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						{items.item.Quantity ? items.item.Quantity : 1}{" "}
					</Text>
					<Ionicons name='close-sharp' size={20}></Ionicons>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						{" "}
						{items.item.name}
					</Text>
					<Text
						onPress={() =>
							Removeitem({
								Quantity: items.item.Quantity,
								name: items.item.name,
							})
						}
						style={{ paddingHorizontal: 10, fontSize: 22, fontWeight: "bold" }}>
						--
					</Text>
				</View>

				<View
					style={{
						marginBottom: 10,
						alignItems: "center",
					}}>
					<View style={{ flex: 1, marginRight: 10 }}>
						<Text style={{ fontSize: 20, marginTop: 10 }}>
							$
							{items.item.Quantity
								? items.item.Quantity * items.item.price
								: items.item.price}
						</Text>
					</View>
				</View>
			</View>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<Headerbar ScreenName={"AddCard"} />
			<Text
				style={{
					fontSize: 22,
					fontWeight: "bold",
					backgroundColor: "#D9D9D9",
					padding: 10,
				}}>
				Items
			</Text>
			{!Totalprice ? (
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Text style={{ fontSize: 20, fontWeight: "800" }}>
						No Items Added
					</Text>
				</View>
			) : null}
			<FlatList data={Card} renderItem={(items) => <Item items={items} />} />
			{Totalprice ? (
				<>
					<Text
						style={{
							fontSize: 22,
							fontWeight: "800",
							marginLeft: 10,
							padding: 10,
						}}>
						Add More To Your Order!
					</Text>
					<FlatList
						horizontal={true}
						data={FlatListData}
						renderItem={({ item, index }) => (
							<AddMore
								id={index}
								name={item.title}
								price={item.data.map((i) => i.price)}
								image={item.data.map((i) => i.image)}
								description={item.data.map((i) => i.description)}
							/>
						)}
					/>
					<View
						style={{
							width: "90%",
							margin: 20,
							justifyContent: "center",
							alignSelf: "center",
						}}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								padding: 10,
							}}>
							<Text
								style={{
									textAlign: "center",
									fontSize: 20,
									fontWeight: "700",
								}}>
								Subtotal
							</Text>
							<Text
								style={{
									textAlign: "center",
									fontSize: 20,
									fontWeight: "700",
								}}>
								${Totalprice}
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								padding: 10,
							}}>
							<Text
								style={{
									textAlign: "center",
									fontSize: 20,
									fontWeight: "700",
								}}>
								Delivery
							</Text>
							<Text
								style={{
									textAlign: "center",
									fontSize: 20,
									fontWeight: "700",
								}}>
								$2.00
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								padding: 10,
							}}>
							<Text
								style={{
									textAlign: "center",
									fontSize: 20,
									fontWeight: "700",
								}}>
								Service
							</Text>
							<Text
								style={{
									textAlign: "center",
									fontSize: 20,
									fontWeight: "700",
								}}>
								$1.00
							</Text>
						</View>
					</View>
				</>
			) : null}
			{Totalprice ? (
				<View
					style={{
						height: 60,
						width: "90%",
						backgroundColor: "yellow",
						margin: 20,
						justifyContent: "center",
						alignSelf: "center",
						borderRadius: 20,
					}}>
					<Text
						style={{ textAlign: "center", fontSize: 20, fontWeight: "700" }}>
						<Text>Order Now : Total</Text> ${Totalprice + 3}
					</Text>
				</View>
			) : null}
		</View>
	);
}
