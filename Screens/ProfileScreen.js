import { React, useState, useEffect } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	StyleSheet,
} from "react-native";
import Headerbar from "../Components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen() {
	const [data, setdata] = useState({ name: "", email: "" });
	const fullName = data.name;
	const nameArray = fullName.split(" ");
	const firstName = nameArray[0];
	const lastName = nameArray[nameArray.length - 1];
	const Navigator = useNavigation();

	const onPressHandle = async () => {
		try {
			await AsyncStorage.clear();
			Navigator.navigate("Onboarding");
		} catch (e) {
			console.log("Error from asyncStorageClear", e);
		}

		console.log("Log out");
	};

	useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await AsyncStorage.getItem("@key");
				setdata(JSON.parse(response));
			};
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const CheckBoxComponent = ({ name }) => {
		return (
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<CheckBox
					checked={true}
					iconType='material-community'
					checkedIcon='checkbox-marked'
					uncheckedIcon='checkbox-blank-outline'
					checkedColor='#495E57'
					size={28}
				/>
				<Text style={{ fontSize: 16, fontWeight: "500", color: "#495E57" }}>
					{name}
				</Text>
			</View>
		);
	};

	return (
		<>
			<Headerbar ScreenName={"ProfileScreen"} />
			<ScrollView>
				<View
					style={{
						flex: 1,
						borderWidth: 1,
						paddingVertical: 20,
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
							justifyContent: "space-around",
							marginRight: 50,
							marginVertical: 10,
						}}>
						<Image
							source={require("../assets/Profile.png")}
							style={{ height: 100, width: 100, borderRadius: 50 }}></Image>
						<TouchableOpacity
							style={{
								height: 45,
								width: 100,
								backgroundColor: "#495E57",
								borderRadius: 8,
								alignItems: "center",
								justifyContent: "center",
								borderColor: "white",
							}}
							// onPress={onPressHandle}
						>
							<Text style={{ fontSize: 18, color: "white", fontWeight: "500" }}>
								Change
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								height: 45,
								width: 100,
								borderRadius: 5,
								alignItems: "center",
								justifyContent: "center",
								borderWidth: 1,
								borderColor: "darkgrey",
							}}
							// onPress={onPressHandle}
						>
							<Text style={{ fontSize: 18, fontWeight: "500" }}>Remove</Text>
						</TouchableOpacity>
					</View>
					<Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
						First name
					</Text>
					<View style={style.DetailVeiwer}>
						<Text style={style.DetailVeiwerTextStyle}>{firstName}</Text>
					</View>
					<Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
						Last name
					</Text>
					<View style={style.DetailVeiwer}>
						<Text style={style.DetailVeiwerTextStyle}>{lastName}</Text>
					</View>
					<Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
						Email
					</Text>
					<View style={style.DetailVeiwer}>
						<Text style={style.DetailVeiwerTextStyle}>{data.email}</Text>
					</View>
					<Text style={{ fontSize: 20, fontWeight: "500" }}>
						Email notifications
					</Text>
					<CheckBoxComponent name={"Order statuses"} />
					<CheckBoxComponent name={"Password changes"} />
					<CheckBoxComponent name={"Special offers"} />
					<CheckBoxComponent name={"Newsletter"} />
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
							// onPress={onPressHandle}
						>
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
							// onPress={onPressHandle}
						>
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
