import { React, useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateEmail } from "../EmailValidater";
import { AuthContext } from "../Components/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
	const { setLogin, setKey } = useContext(AuthContext);
	const height = StatusBar.currentHeight;
	const Navigator = useNavigation();
	const [data, setData] = useState({
		email: "",
	});
	const [FetchData, setFetchData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		orderStatus: false,
		passwordChange: true,
		specialOffers: true,
		newsLetter: true,
		Image: "",
	});

	const [isEmailMatch, setisEmailMatch] = useState(false);
	const [isEmailValid, setEmailVaild] = useState(false);
	const isValid = !validateEmail(data.email);

	const getData = async () => {
		try {
			const response = await AsyncStorage.getItem(data.email);
			const datda = JSON.parse(response);

			datda
				? (setLogin(true),
				  setKey(datda.email),
				  await AsyncStorage.setItem(
						"@IsLogin",
						JSON.stringify({ IsLogin: true, key: datda.email })
				  ))
				: setisEmailMatch(true);
		} catch (error) {
			console.log("", error);
		}
	};

	const onPressHandle = async () => {
		if (!isValid) {
			await getData();
		} else {
			if (isValid) {
				setEmailVaild(true);
			}
		}
	};

	const loadingScreen = () => {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator size={"large"} />
			</View>
		);
	};

	return (
		<ScrollView style={{ flex: 1 }}>
			<View
				style={{
					height: 100,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#e1e4e8",
					paddingTop: height,
				}}>
				<Image
					source={require("../assets/Logo.png")}
					style={{ height: 50, width: 190, marginBottom: 10 }}></Image>
			</View>

			{/* <View style={{ flex: 1, backgroundColor: "black" }}> */}
			<View
				style={{
					backgroundColor: "#cecedb",
					height: "65%",
				}}>
				<View>
					<View
						style={{
							alignItems: "center",
							marginVertical: "15%",
						}}>
						<Text style={{ fontSize: 26, fontWeight: "400", color: "#333333" }}>
							Let us get to know you
						</Text>
					</View>
				</View>
				<View
					style={{
						alignItems: "center",
						// height: 280,
						marginTop: "10%",
						marginBottom: "20%",
					}}>
					<View style={{ justifyContent: "center" }}>
						<Text style={{ fontSize: 26, fontWeight: "400", color: "#333333" }}>
							Email
						</Text>
					</View>

					<TextInput
						style={{
							borderWidth: 2,
							width: "70%",
							borderRadius: 10,
							height: 60,
							borderColor: "#333333",
							marginVertical: 20,
							fontSize: 22,
							paddingHorizontal: 10,
						}}
						value={data.email}
						keyboardType='email-address'
						onChangeText={(t) => setData({ ...data, email: t })}></TextInput>
					{isEmailValid && isValid ? (
						<Text style={{ color: "red" }}>Email Not Valid</Text>
					) : null}
					{isEmailMatch ? (
						<Text style={{ color: "red" }}>Email does Not Match</Text>
					) : null}
				</View>
			</View>
			<View
				style={{
					height: "15%",
					justifyContent: "center",
					paddingRight: "10%",
				}}>
				<TouchableOpacity
					style={{
						height: 50,
						width: 120,
						backgroundColor: "#cecedb",
						borderRadius: 10,
						alignItems: "center",
						justifyContent: "center",
						alignSelf: "flex-end",
					}}
					onPress={onPressHandle}>
					<Text style={{ fontSize: 24 }}>Next</Text>
				</TouchableOpacity>
			</View>

			{/* </View> */}
		</ScrollView>
	);
};

export default Login;
