import { React, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./Screens/Onboarding";
import ProfileScreen from "./Screens/ProfileScreen";
import Home from "./Screens/Home";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Onboarding' component={Onboarding} />
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Profile' component={ProfileScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default App;
