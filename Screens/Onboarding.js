import { React, useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateEmail } from "../EmailValidater";

const Onboarding = () => {
	const [IsLoading, SetLoading] = useState(false);

	const [data, setData] = useState({
		name: "",
		email: "",
	});

	const [getdata, setgetdata] = useState({
		name: "",
		email: "",
	});
	const [isnameFill, setnamefill] = useState(false);
	const [isEmailValid, setEmailVaild] = useState(false);

	const isValid = !validateEmail(data.email);
	const Navigator = useNavigation();
	useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await AsyncStorage.getItem("@key");
				response ? setgetdata(JSON.parse(response)) : null;
				SetLoading(true);
				response
					? !JSON.parse(response).name == ""
						? Navigator.dispatch(StackActions.replace("Home"))
						: null
					: null;
			};
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const StoreData = async () => {
		try {
			await AsyncStorage.setItem("@key", JSON.stringify(data));
		} catch (error) {
			console.log(error);
		}
		console.log("Done.");
	};

	const onPressHandle = () => {
		if (!data.name == "" && !isValid) {
			Navigator.dispatch(StackActions.replace("Home"));
			StoreData();
			setnamefill(false);
			setEmailVaild(false);
			setData({
				name: "",
				email: "",
			});
		} else {
			if (data.name == "") {
				setnamefill(true);
			}
			if (isValid) {
				setEmailVaild(true);
			}
		}
	};

	return !IsLoading ? (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<ActivityIndicator size={"large"} />
			<Text style={{ fontSize: 25, fontWeight: "400", marginTop: 10 }}>
				Loading...
			</Text>
		</View>
	) : (
		<>
			<View
				style={{
					height: 90,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#e1e4e8",
				}}>
				<Image
					source={require("../assets/Logo.png")}
					style={{ height: 60, width: 250, top: 10 }}></Image>
			</View>
			<ScrollView>
				<View
					style={{
						backgroundColor: "#cecedb",
					}}>
					<View style={{ height: 200 }}>
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
							height: 280,
							marginTop: "10%",
							marginBottom: "20%",
						}}>
						<View style={{ justifyContent: "center" }}>
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
							value={data.email}
							onChangeText={(t) => setData({ ...data, email: t })}></TextInput>
						{isEmailValid && isValid ? (
							<Text style={{ color: "red" }}>Email Not Valid</Text>
						) : null}
					</View>
				</View>

				<View
					style={{
						height: 100,
						justifyContent: "center",
						alignItems: "flex-end",
						marginRight: "10%",
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

export default Onboarding;
