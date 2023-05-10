import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Headerbar } from "../Components/Header";

const Details = ({ navigation, route }) => {
	const name = route.params.names;
	const price = route.params.prices;
	const image = route.params.images;
	const description = route.params.descriptions;
	const [valid, setvalid] = useState(false);

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
							paddingLeft: 10,
							marginTop: -10,
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
					<Text
						style={{ fontSize: 22, fontWeight: "bold", paddingVertical: 10 }}>
						{name}
					</Text>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>${price}</Text>
					<Text style={{ fontSize: 18, paddingVertical: 5 }}>
						{description}
					</Text>
				</View>
			</View>
		</>
	);
};

export default Details;
