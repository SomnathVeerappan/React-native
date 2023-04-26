import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

function Headerbar({ ScreenName }) {
	const Navigator = useNavigation();
	const handlePress = () => {
		Navigator.goBack();
	};
	const ProfilehandlePress = () => {
		Navigator.navigate("Profile");
	};

	return (
		<View>
			<View
				style={{
					height: 80,
					// backgroundColor: "red",
					justifyContent: "space-around",
					paddingTop: 25,
					flexDirection: "row",
				}}>
				{ScreenName == "Home" ? (
					<View style={{ height: 50, width: 50 }}></View>
				) : (
					<TouchableOpacity onPress={handlePress}>
						<Ionicons size={50} name='arrow-back-circle'></Ionicons>
					</TouchableOpacity>
				)}
				<Image
					source={require("../assets/Logo.png")}
					style={{ height: 50, width: 190 }}></Image>
				<TouchableOpacity onPress={ProfilehandlePress}>
					<Image
						source={require("../assets/Profile.png")}
						style={{ height: 50, width: 50, borderRadius: 25 }}></Image>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Headerbar;
