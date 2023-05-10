import { React, useState, useEffect, useContext } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	StyleSheet,
	TextInput,
	Alert,
} from "react-native";
import { Headerbar } from "../Components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../Components/AuthContext";

function ProfileScreen() {
	const { setLogin, key } = useContext(AuthContext);
	const [data, setdata] = useState({
		firstName: "",
		lastName: "",
		email: "",
		Image: "",
		orderStatus: false,
		passwordChange: true,
		specialOffers: true,
		newsLetter: true,
	});

	const firstName = data.firstName ? data.firstName : "";
	const lastName = data.lastName ? data.lastName : "";
	const Navigator = useNavigation();

	const onPressHandle = async () => {
		try {
			await AsyncStorage.setItem(
				data.email,
				JSON.stringify({ ...data, Token: "" })
			);
			await AsyncStorage.setItem(
				"@IsLogin",
				JSON.stringify({ IsLogin: false, key: "" })
			);
			setLogin(false);
		} catch (e) {
			console.log("Error from asyncStorageClear", e);
		}

		console.log("Log out");
	};

	useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await AsyncStorage.getItem(key);
				setdata(JSON.parse(response));
				console.log(JSON.parse(response));
			};
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const Imagepicker = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setdata({ ...data, Image: result.assets[0].uri });
			await AsyncStorage.mergeItem(
				data.email,
				JSON.stringify({ Image: result.assets[0].uri })
			);
		}
	};

	const ImageRemover = async () => {
		if (!data.Image == "") {
			setdata({ ...data, Image: "" });
			await AsyncStorage.setItem(
				data.email,
				JSON.stringify({ ...data, Image: "" })
			);
			console.log(data);
		}
	};

	const CheckBoxComponent = ({ value, name, onChange }) => {
		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}>
				<Checkbox
					style={{ padding: 10, margin: 10 }}
					onValueChange={onChange}
					color={"#495E57"}
					value={value}
					size={25}
				/>
				<Text style={{ fontSize: 16, fontWeight: "500", color: "#495E57" }}>
					{name}
				</Text>
			</View>
		);
	};
	const SaveChanges = async () => {
		try {
			await AsyncStorage.setItem(
				data.email,
				JSON.stringify(data),
				Alert.alert(" Successfully Saved Changes.")
			);
		} catch (error) {
			console.log("Error From Profile Save Changes ", error);
		}
	};
	return (
		<>
			<Headerbar
				ScreenName={"ProfileScreen"}
				render={(Imagepicker, ImageRemover)}
			/>
			<ScrollView>
				<View
					style={{
						flex: 1,
						borderWidth: 1,
						paddingVertical: 5,
						paddingHorizontal: 10,
						borderRadius: 10,
						margin: 5,
						borderColor: "lightgrey",
					}}>
					<Text style={{ fontSize: 20, fontWeight: "500" }}>
						Personal information
					</Text>
					<Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
						Avatar
					</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-evenly",
							marginRight: 50,
							marginVertical: 10,
						}}>
						{data.Image ? (
							<Image
								source={{ uri: data.Image }}
								style={{ height: 100, width: 100, borderRadius: 50 }}></Image>
						) : (
							<View
								style={{
									height: 100,
									width: 100,
									borderRadius: 50,
									alignItems: "center",
									justifyContent: "center",
									borderColor: "lightgrey",
									borderWidth: 1,
								}}>
								<Text style={{ fontSize: 35, fontWeight: "bold" }}>
									{firstName[0]}
									{lastName[0]}
								</Text>
							</View>
						)}

						<TouchableOpacity
							style={{
								backgroundColor: "#495E57",
								borderRadius: 5,
								alignItems: "center",
								justifyContent: "center",
								borderColor: "white",
							}}
							onPress={Imagepicker}>
							<Text
								style={{
									padding: 10,
									fontSize: 18,
									color: "white",
									fontWeight: "500",
								}}>
								Change
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								borderRadius: 5,
								alignItems: "center",
								justifyContent: "center",
								borderWidth: 1,
								borderColor: "darkgrey",
							}}
							onPress={ImageRemover}>
							<Text style={{ padding: 10, fontSize: 18, fontWeight: "500" }}>
								Remove
							</Text>
						</TouchableOpacity>
					</View>
					<Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
						First name
					</Text>
					<View style={style.DetailVeiwer}>
						<TextInput
							style={style.DetailVeiwerTextStyle}
							value={data.firstName}
							onChangeText={(t) => setdata({ ...data, firstName: t })}
						/>
					</View>
					<Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
						Last name
					</Text>
					<View style={style.DetailVeiwer}>
						<TextInput
							style={style.DetailVeiwerTextStyle}
							value={data.lastName}
							onChangeText={(t) => setdata({ ...data, lastName: t })}
						/>
					</View>
					<Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
						Email
					</Text>
					<View style={style.DetailVeiwer}>
						<TextInput
							style={style.DetailVeiwerTextStyle}
							value={data.email}
							onChangeText={(t) => setdata({ ...data, email: t })}
						/>
					</View>
					<Text style={{ fontSize: 20, fontWeight: "500" }}>
						Email notifications
					</Text>
					<CheckBoxComponent
						value={data.orderStatus}
						name={"Order statuses"}
						onChange={() =>
							setdata({ ...data, orderStatus: !data.orderStatus })
						}
					/>
					<CheckBoxComponent
						value={data.passwordChange}
						name={"Password changes"}
						onChange={() =>
							setdata({
								...data,
								passwordChange: !data.passwordChange,
							})
						}
					/>
					<CheckBoxComponent
						value={data.specialOffers}
						name={"Special offers"}
						onChange={() =>
							setdata({ ...data, specialOffers: !data.specialOffers })
						}
					/>
					<CheckBoxComponent
						value={data.newsLetter}
						name={"Newsletter"}
						onChange={() => setdata({ ...data, newsLetter: !data.newsLetter })}
					/>
					<TouchableOpacity
						style={{
							height: 45,
							borderRadius: 10,
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "yellow",
							marginVertical: 20,
						}}
						onPress={onPressHandle}>
						<Text style={{ fontSize: 18, fontWeight: "600" }}>Log out</Text>
					</TouchableOpacity>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-around",
						}}>
						<TouchableOpacity
							style={{
								height: 45,
								width: 160,
								borderRadius: 10,
								alignItems: "center",
								justifyContent: "center",
								borderWidth: 1,
								borderColor: "darkgrey",
							}}
							onPress={() => Navigator.navigate("Home")}>
							<Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
								Discard changes
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								height: 45,
								width: 160,
								borderRadius: 10,
								alignItems: "center",
								justifyContent: "center",
								borderWidth: 1,
								backgroundColor: "#495E57",
								borderColor: "white",
							}}
							onPress={SaveChanges}>
							<Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
								Save changes
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</>
	);
}

export default ProfileScreen;

const style = StyleSheet.create({
	DetailVeiwer: {
		height: 50,
		borderWidth: 2,
		borderColor: "lightgrey",
		borderRadius: 10,
		marginBottom: 10,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	DetailVeiwerTextStyle: {
		fontSize: 16,
		fontWeight: "500",
		color: "#495E57",
	},
});
