import { React, useEffect, useState, useContext } from "react";
import {
	Image,
	TextInput,
	View,
	Alert,
	FlatList,
	TouchableOpacity,
	StatusBar,
	Touchable,
	Pressable,
} from "react-native";
import { Text } from "@rneui/base";
import { Ionicons } from "react-native-vector-icons";
import {
	createTable,
	getMenuItems,
	getSectionListData,
	saveMenuItems,
	filterByQueryAndCategories,
} from "../database";
import { Filter } from "../Components/Filters";
import updateUseEffect from "../Components/CustomUseEffect";
import DummyData from "../assets/DummyData";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Components/AuthContext";
import { Suggestion } from "../Components/Suggestion";
import { Headerbar } from "../Components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ name, price, image, description }) => {
	const [valid, setvalid] = useState(false);
	const Navigator = useNavigation();
	return (
		<Pressable
			style={{
				borderBottomWidth: 1,
				borderBottomColor: "lightgrey",
				marginHorizontal: 15,
			}}
			onPress={() =>
				Navigator.navigate("Details", {
					names: name,
					prices: price,
					images: image,
					descriptions: description,
				})
			}>
			<View
				style={{
					width: "100%",
					paddingVertical: 10,
					flexDirection: "row",
					justifyContent: "space-between",
				}}>
				<Text style={{ fontSize: 22, fontWeight: "bold" }}>{name}</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					marginBottom: 10,
					alignItems: "center",
				}}>
				<View style={{ flex: 1, marginRight: 10 }}>
					<Text style={{ fontSize: 20 }} numberOfLines={2}>
						{description}
					</Text>
					<Text style={{ fontSize: 20, marginTop: 10 }}>${price}</Text>
				</View>
				<View>
					<Image
						onError={() => setvalid(true)}
						style={{
							resizeMode: "cover",
							height: 90,
							width: 100,
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

const section = ["starters", "mains", "desserts", "drinks"];

function Home({ navigation }) {
	const [Data, setData] = useState([]);
	const [searchBarValue, setSearchBarValue] = useState("");
	const [query, setQuery] = useState("");
	const [filterSelections, setFilterSelections] = useState(
		section.map(() => false)
	);
	const [ViewSuggection, setViewSuggestion] = useState(true);
	const {
		headerRefresh,
		setheaderRefresh,
		key,
		setCard,
		sethowMany,
		setFlatListData,
	} = useContext(AuthContext);

	async function fetchData() {
		try {
			const response = await fetch(
				"https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
			);
			const data = await response.json();
			// console.log(data);
			return data;
		} catch (error) {
			console.log("error", error.message);
		}
	}

	// console.log("sgag", fetchData());
	useEffect(() => {
		(async () => {
			try {
				setheaderRefresh(!headerRefresh);
				await createTable();
				const dataFromDatabase = await getMenuItems();

				if (!dataFromDatabase.length) {
					const data = DummyData;
					await saveMenuItems(data);
					const SectionListdata = getSectionListData(data.menu);
					setData(SectionListdata);
					setFlatListData(SectionListdata);
					// console.log(SectionListdata);
				}

				if (dataFromDatabase.length > 0) {
					const SectionList = getSectionListData(dataFromDatabase);
					setData(SectionList);
					setFlatListData(SectionList);
					// console.log(SectionList);
				}

				await AsyncStorage.getItem(key, (err, res) => {
					const data = JSON.parse(res);
					if (data) {
						setCard(data.AddToCard);
						sethowMany(data.Items == null ? 0 : data.Items);
					}
				});
			} catch (error) {
				Alert.alert(error);
			}
		})();
	}, []);

	updateUseEffect(() => {
		(async () => {
			const activeCategories = section.filter((s, i) => {
				// If all filters are deselected, all categories are active
				if (filterSelections.every((item) => item === false)) {
					return true;
				}
				return filterSelections[i];
			});
			// console.log(activeCategories);
			try {
				const menuItems = await filterByQueryAndCategories(
					query,
					activeCategories
				);
				const sectionListData = getSectionListData(menuItems);
				// console.log("sectionListData", sectionListData);
				setData(sectionListData);
			} catch (e) {
				Alert.alert(e.message);
			}
		})();
	}, [query, filterSelections]);

	const HandleFilterChange = (index) => {
		const arrayCopy = [...filterSelections];
		arrayCopy[index] = !filterSelections[index];
		setFilterSelections(arrayCopy);
	};

	const textChangeHandler = (text) => {
		setSearchBarValue(text);
		setQuery(text);
		setViewSuggestion(true);
	};

	return (
		<>
			<Headerbar ScreenName={"Home"} render={headerRefresh} />
			<View style={{ flex: 1 }}>
				<View
					style={{
						backgroundColor: "#495E57",
						paddingHorizontal: 20,
					}}>
					<Text
						style={{
							color: "yellow",
							fontSize: 40,
							fontWeight: "600",
							paddingTop: 5,
						}}>
						Little lemon
					</Text>
					<View style={{ flexDirection: "row" }}>
						<View
							style={{
								flex: 0.5,
							}}>
							<Text
								style={{
									fontSize: 30,
									fontWeight: "400",
									color: "white",
									marginBottom: 12,
								}}>
								Chicago
							</Text>
							<Text style={{ fontSize: 18, fontWeight: "400", color: "white" }}>
								We are a family owned Mediterranean restaurant, fousced on
								traditional recipes served with a modern twist
							</Text>
						</View>
						<View style={{ flex: 0.5, alignItems: "center" }}>
							<Image
								source={require("../assets/Heroimage.png")}
								style={{ height: 170, width: 160, borderRadius: 20 }}
							/>
						</View>
					</View>
					<View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								top: 10,
								backgroundColor: "white",
								borderRadius: 25,
								height: 50,
								paddingLeft: 7,
								marginBottom: 20,
								justifyContent: "space-evenly",
							}}>
							<Ionicons name='search' size={35}></Ionicons>
							<TextInput
								value={searchBarValue}
								style={{
									fontSize: 22,
									paddingLeft: 5,
									width: "75%",
									height: 40,
								}}
								onChangeText={textChangeHandler}></TextInput>
							{!searchBarValue == "" ? (
								<Pressable
									style={{ width: 50 }}
									onPress={() => (
										setQuery(""), setViewSuggestion(true), setSearchBarValue("")
									)}>
									<Ionicons name='close-sharp' size={23}></Ionicons>
									{/* <Text style={{ color: "red", fontSize: 18 }}>clear</Text> */}
								</Pressable>
							) : (
								<View style={{ width: 50 }}></View>
							)}
						</View>
					</View>
				</View>
				<View
					style={{
						marginHorizontal: 15,
						paddingVertical: 10,
						borderBottomColor: "lightgrey",
						borderBottomWidth: 1,
					}}>
					{searchBarValue && ViewSuggection ? (
						<Suggestion
							Data={Data}
							setQuery={setQuery}
							setSearchBarValue={setSearchBarValue}
							setViewSuggestion={setViewSuggestion}
						/>
					) : null}

					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
						}}>
						ORDER FOR DELIVERY!
					</Text>
					<Filter
						selections={filterSelections}
						section={section}
						onChange={HandleFilterChange}></Filter>
				</View>
				{Data == "" ? (
					<View
						style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
						<Text style={{ fontSize: 30, fontWeight: "700" }}>
							Dish not available now!
						</Text>
					</View>
				) : (
					<FlatList
						data={Data}
						renderItem={({ item, index }) => (
							<Item
								id={index}
								name={item.title}
								price={item.data.map((i) => i.price)}
								image={item.data.map((i) => i.image)}
								description={item.data.map((i) => i.description)}
							/>
						)}
					/>
				)}
			</View>
		</>
	);
}
export default Home;
