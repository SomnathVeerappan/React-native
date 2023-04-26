import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export function Filter({ onChange, section, selections }) {
	return (
		<View style={styles.filtersContainer}>
			{section.map((section, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => {
						onChange(index);
					}}
					style={{
						flex: 1,
						paddingHorizontal: 5,
						paddingVertical: 10,
						borderWidth: 1,
						borderColor: "white",
						backgroundColor: selections[index] ? "#EE9972" : "#dee3e0",
						borderRadius: 20,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<View>
						<Text
							style={{
								fontSize: 17,
								fontWeight: "bold",
								color: selections[index] ? "white" : "black",
								textTransform: "capitalize",
							}}>
							{section}
						</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	filtersContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 5,
	},
});
