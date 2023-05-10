import React from "react";
import { View, Text, FlatList } from "react-native";

export const Suggestion = ({
	Data,
	setQuery,
	setSearchBarValue,
	setViewSuggestion,
}) => {
	return (
		<View
			style={{
				position: "absolute",
				width: "95%",
				maxHeight: 100,
				alignSelf: "center",
				top: "-12%",
				zIndex: 1,
				borderRadius: 10,
			}}>
			<FlatList
				data={Data}
				renderItem={(data) => (
					<View
						style={{
							backgroundColor: "white",
							paddingLeft: 15,
							borderBottomColor: "lightgrey",
							borderBottomWidth: 1,
						}}>
						<Text
							onPress={() => (
								setQuery(data.item.title),
								setSearchBarValue(data.item.title),
								setViewSuggestion(false)
							)}
							style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
							{data.item.title}
						</Text>
					</View>
				)}
			/>
		</View>
	);
};
