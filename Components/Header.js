import { useContext, useEffect, useState } from "react";
import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "react-native-vector-icons";

export function Headerbar({ ScreenName, render }) {
	const height = StatusBar.currentHeight;
	const Navigator = useNavigation();
	const { key, setheaderRefresh, headerRefresh, howMany } =
		useContext(AuthContext);
	const handlePress = () => {
		ScreenName == "ProfileScreen" ? setheaderRefresh(!headerRefresh) : null;
		Navigator.goBack();
	};

	const ProfilehandlePress = () => {
		Navigator.navigate("Profile");
	};

	const [profile, setProfile] = useState({
		firstName: "",
		lastName: "",
		email: "",
		Image: "",
	});

	useEffect(() => {
		try {
			const data1 = async () => {
				const data = await AsyncStorage.getItem(key);
				data ? setProfile(JSON.parse(data)) : null;
			};
			data1();
		} catch (e) {
			console.log("fetch profile error", e);
		}
	}, [render]);

	const firstLetter = profile.firstName ? profile.firstName[0] : "";
	const lastletter = profile.lastName ? profile.lastName[0] : "";
	return (
		<View>
			<View style={{ height: height }}></View>
			<View
				style={{
					justifyContent: "space-around",
					flexDirection: "row",
					paddingBottom: 10,
					alignItems: "center",
				}}>
				{ScreenName == "Home" ? (
					<TouchableOpacity
						style={{ paddingTop: 5 }}
						onPress={() => Navigator.navigate("AddCard")}>
						{howMany ? (
							<Text
								style={{
									position: "absolute",
									backgroundColor: "black",
									color: "white",
									height: 20,
									width: 20,
									borderRadius: 10,
									textAlign: "center",
								}}>
								{howMany}
							</Text>
						) : null}
						<Ionicons size={40} name='basket-outline'></Ionicons>
					</TouchableOpacity>
				) : null}
				{ScreenName == "Home" ? null : (
					<TouchableOpacity onPress={handlePress}>
						<Ionicons size={50} name='arrow-back-circle'></Ionicons>
					</TouchableOpacity>
				)}
				<Image
					source={require("../assets/Logo.png")}
					style={{ height: 50, width: 190 }}></Image>

				{ScreenName == "Details" ? (
					<TouchableOpacity onPress={() => Navigator.navigate("AddCard")}>
						{howMany ? (
							<Text
								style={{
									position: "absolute",
									backgroundColor: "black",
									color: "white",
									height: 20,
									width: 20,
									borderRadius: 10,
									textAlign: "center",
								}}>
								{howMany}
							</Text>
						) : null}
						<Ionicons size={40} name='basket-outline'></Ionicons>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={ProfilehandlePress}>
						{profile.Image ? (
							<Image
								source={{ uri: profile.Image }}
								style={{ height: 50, width: 50, borderRadius: 25 }}></Image>
						) : (
							<View
								style={{
									height: 50,
									width: 50,
									borderRadius: 25,
									alignItems: "center",
									justifyContent: "center",
									borderColor: "lightgrey",
									borderWidth: 1,
								}}>
								<Text style={{ fontSize: 25, fontWeight: "bold" }}>
									{firstLetter}
									{lastletter}
								</Text>
							</View>
						)}
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}
