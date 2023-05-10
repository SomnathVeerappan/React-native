import { React, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./Screens/SignUp";
import ProfileScreen from "./Screens/ProfileScreen";
import Home from "./Screens/Home";
import Details from "./Screens/DetailPage";
import { AuthContext } from "./Components/AuthContext";
import Onboarding from "./Screens/OnboaringScreen";
import Login from "./Screens/Login";

const Stack = createNativeStackNavigator();

function App() {
	const [isLogin, setLogin] = useState(false);
	const [key, setKey] = useState("");
	const [headerRefresh, setheaderRefresh] = useState(false);
	return (
		<AuthContext.Provider
			value={{ setLogin, setKey, key, setheaderRefresh, headerRefresh }}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{isLogin ? (
						<>
							<Stack.Screen name='Home' component={Home} />
							<Stack.Screen name='Profile' component={ProfileScreen} />
							<Stack.Screen name='Details' component={Details} />
						</>
					) : (
						<>
							<Stack.Screen name='Onboarding' component={Onboarding} />
							<Stack.Screen name='SignUp' component={SignUp} />
							<Stack.Screen name='Login' component={Login} />
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
export default App;
