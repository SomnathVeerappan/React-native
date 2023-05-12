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

const SignUp = () => {
	const { setLogin, setKey } = useContext(AuthContext);

	const height = StatusBar.currentHeight;
	const [IsLoading, SetLoading] = useState(false);
	const Navigator = useNavigation();
	const [data, setData] = useState({
		name: "",
		email: "",
	});

	const [isnameFill, setnamefill] = useState(false);
	const [isEmailValid, setEmailVaild] = useState(false);

	const isValid = !validateEmail(data.email);

	const StoreData = async () => {
		try {
			setKey(data.email);
			const fullName = data.name;
			const nameArray = fullName.split(" ");
			const AsyncData = {
				firstName: nameArray[0],
				lastName: nameArray[1] == undefined ? "" : nameArray[1],
				email: data.email ? data.email : "",
				orderStatus: false,
				passwordChange: true,
				specialOffers: true,
				newsLetter: true,
			};

			await AsyncStorage.setItem(data.email, JSON.stringify(AsyncData), () => {
				AsyncStorage.getItem(data.email, (err, result) => {
					console.log("result from singup ", result);
				});
			});
		} catch (error) {
			console.log(error);
		}
		console.log("AsyncData Store Successfully.");
	};

	const onPressHandle = async () => {
		if (!data.name == "" && !isValid) {
			await StoreData();
			await AsyncStorage.setItem(
				"@IsLogin",
				JSON.stringify({ IsLogin: true, key: data.email })
			);
			setLogin(true);
			setnamefill(false);
			setEmailVaild(false);
		} else {
			if (data.name == "") {
				setnamefill(true);
			}
			if (isValid) {
				setEmailVaild(true);
			}
		}
	};

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
		<>
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

			<ScrollView>
				<View
					style={{
						backgroundColor: "#cecedb",
						height: "85%",
					}}>
					<View>
						<View
							style={{
								alignItems: "center",
								marginVertical: "15%",
							}}>
							<Text
								style={{ fontSize: 26, fontWeight: "400", color: "#333333" }}>
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
						<View style={{ justifyContent: "center", marginTop: 20 }}>
							<Text
								style={{ fontSize: 26, fontWeight: "400", color: "#333333" }}>
								FullName
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
							value={data.name}
							onChangeText={(t) => setData({ ...data, name: t })}></TextInput>
						{isnameFill && !data.name ? (
							<Text style={{ color: "red" }}>Name field not filled</Text>
						) : null}
						<View style={{ justifyContent: "center" }}>
							<Text
								style={{ fontSize: 26, fontWeight: "400", color: "#333333" }}>
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
							keyboardType='email-address'
							value={data.email}
							onChangeText={(t) => setData({ ...data, email: t })}></TextInput>
						<Text
							onPress={() => Navigator.navigate("Login")}
							style={{
								// height: 5,
								padding: 10,
								fontSize: 16,
								fontWeight: "500",
								textDecorationLine: "underline",
							}}>
							Do you already have an account ? Click this.
						</Text>
						{isEmailValid && isValid ? (
							<Text style={{ color: "red" }}>Email Not Valid</Text>
						) : null}
					</View>
				</View>
				<View
					style={{
						height: "20%",
						justifyContent: "center",
						alignItems: "flex-end",
						paddingRight: "10%",
						backgroundColor: null,
					}}>
					<TouchableOpacity
						style={{
							height: 50,
							width: 120,
							backgroundColor: "#cecedb",
							borderRadius: 10,
							alignItems: "center",
							justifyContent: "center",
						}}
						onPress={onPressHandle}>
						<Text style={{ fontSize: 24 }}>Next</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</>
	);
};

export default SignUp;
