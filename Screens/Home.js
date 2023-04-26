import { React, useEffect, useState, useCallback } from "react";
import {
	Image,
	TextInput,
	View,
	Alert,
	SectionList,
	Pressable,
} from "react-native";
import Headerbar from "../Components/Header";
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

const Item = ({ price, image, description }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				paddingHorizontal: 15,
				marginBottom: 10,
			}}>
			<View style={{ flex: 1, marginRight: 10 }}>
				<Text style={{ fontSize: 20 }} numberOfLines={2}>
					{description}
				</Text>
				<Text style={{ fontSize: 20, marginTop: 10 }}>${price}</Text>
			</View>
			<View>
				<Image
					style={{ height: 100, width: 100, paddingLeft: 10, marginTop: -10 }}
					source={{
						uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
					}}
					// source={images}
				/>
			</View>
		</View>
	);
};

const section = ["starters", "mains", "desserts", "drinks"];

function Home() {
	const [toggle, setToggle] = useState(false);
	const [Data, setData] = useState([]);
	const [searchBarValue, setSearchBarValue] = useState("");
	const [query, setQuery] = useState("");
	const [filterSelections, setFilterSelections] = useState(
		section.map(() => false)
	);

	const SearchHandler = () => {
		setToggle(!toggle);
	};
	async function fetchData() {
		try {
			const response = await fetch(
				"https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
			);
			const data = await response.json();

			return data;
		} catch (error) {
			console.log("error", error.message);
		}
	}

	useEffect(() => {
		(async () => {
			try {
				await createTable();
				const dataFromDatabase = await getMenuItems();

				if (!dataFromDatabase.length) {
					const data = DummyData;
					await saveMenuItems(data);
					const SectionListdata = getSectionListData(data.menu);
					setData(SectionListdata);
				}

				if (dataFromDatabase.length > 0) {
					const SectionList = getSectionListData(dataFromDatabase);
					setData(SectionList);
				}
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
	};

	return (
		<>
			<Headerbar ScreenName={"Home"} />
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
								flex: 0.6,
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
					<Pressable
						onPress={SearchHandler}
						style={
							toggle
								? {
										flexDirection: "row",
										alignItems: "center",
										top: 10,
										backgroundColor: "white",
										borderRadius: 25,
										height: 50,
										width: "100%",
										paddingLeft: 7,
										marginBottom: 20,
								  }
								: {
										flexDirection: "row",
										alignItems: "center",
										top: 10,
										backgroundColor: "white",
										borderRadius: 25,
										height: 50,
										width: 50,
										paddingLeft: 7,
										marginBottom: 20,
								  }
						}>
						<Ionicons name='search' size={35}></Ionicons>
						<TextInput
							value={searchBarValue}
							style={{
								fontSize: 20,
								paddingLeft: 5,
								width: !toggle ? 0 : "100%",
							}}
							onChangeText={textChangeHandler}></TextInput>
					</Pressable>
				</View>
				<View
					style={{
						marginHorizontal: 15,
						paddingVertical: 10,
						borderBottomColor: "lightgrey",
						borderBottomWidth: 1,
					}}>
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
					<SectionList
						sections={Data}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Item
								name={item.name}
								price={item.price}
								image={item.image}
								description={item.description}
							/>
						)}
						renderSectionHeader={({ section: { title } }) => (
							<Text
								style={{
									fontSize: 25,
									fontWeight: "700",
									paddingHorizontal: 15,
									marginTop: 10,
								}}>
								{title}
							</Text>
						)}
					/>
				)}
			</View>
		</>
	);
}
export default Home;
