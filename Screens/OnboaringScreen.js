import React, { useEffect, useContext, useState } from "react";
import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding() {
	const Navigator = useNavigation();
	const { setLogin, setKey } = useContext(AuthContext);
	const [IsLoading, setIsLoading] = useState(false);

	useEffect(() => {
		try {
			setIsLoading(true);
			const fetchData = async () => {
				const Login = await AsyncStorage.getItem("@IsLogin");

				// const checkData = { key: "somnath@gmail.com", IsLogin: true };
				const checkData = JSON.parse(Login);

				console.log("CheckData", checkData);
				checkData.IsLogin
					? (setKey(checkData.key), setLogin(true), setIsLoading(false))
					: setIsLoading(false);
			};

			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const loadingScreen = () => {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator size={"large"} />
				<Text style={{ fontSize: 25, fontWeight: "400", marginTop: 10 }}>
					Loading...
				</Text>
			</View>
		);
	};

	return IsLoading ? (
		loadingScreen()
	) : (
		<View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
			<ImageBackground
				source={require("../assets/OnboadingBackground.jpg")}
				style={{ height: "100%", width: "100%", alignItems: "center" }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "flex-end",
						justifyContent: "space-between",
						width: "70%",
						flex: 1,
						marginBottom: "30%",
					}}>
					<TouchableOpacity
						onPress={() => Navigator.navigate("SignUp")}
						style={{
							backgroundColor: "white",
							borderRadius: 30,
						}}>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								paddingVertical: 15,
								paddingHorizontal: 30,
							}}>
							Sign up
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => Navigator.navigate("Login")}
						style={{
							backgroundColor: "white",
							borderRadius: 30,
						}}>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								paddingVertical: 15,
								paddingHorizontal: 30,
							}}>
							Log in
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
}
