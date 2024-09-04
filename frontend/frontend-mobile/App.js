import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { store } from './src/store/index.js';
import 'react-native-gesture-handler';

import StartUp from './src/features/StartUp/StartUp';
import Highlights from './src/features/Highlights/Highlights';
import CookieBanner from './src/features/CookieBanner/CookieBanner';
import SignUp from './src/features/SignUp/SignUp';
import Login from './src/features/Login/Login';
import PasswordReset from './src/features/PasswordReset/PasswordReset';
import Dashboard from './src/features/Dashboard/Dashboard';
import Assistant from './src/features/Dashboard/components/Assistant';
import Compass from './src/features/Dashboard/components/Compass';
import Profile from './src/features/Dashboard/components/Profile';
import UserSettings from './src/features/Dashboard/components/UserSettings';
import CustomButton from './src/components/CustomButton';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const loadFonts = () => {
  return Font.loadAsync({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
  });
};


const DashboardTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <CustomButton
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
              iconLibrary="FontAwesome"
              iconName="home"
              iconSize={32}
              iconColor="#16c72e"
              textStyle={styles.tabBarSideButtonTextStyle}
            >
              Übersicht
            </CustomButton>
          ),
        }}
      />
      <Tab.Screen
        name="Assistant"
        component={Assistant}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <CustomButton
              onPress={() => {
                navigation.navigate('Assistant');
              }}
              iconLibrary="MaterialIcons"
              iconName="assistant"
              iconSize={32}
              iconColor="#16c72e"
              textStyle={styles.tabBarMainButtonTextStyle}
            >
              Assistent
            </CustomButton>
          ),
        }}
      />
      <Tab.Screen
        name="Compass"
        component={Compass}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <CustomButton
              onPress={() => {
                navigation.navigate('Compass');
              }}
              iconLibrary="FontAwesome"
              iconName="compass"
              iconSize={32}
              iconColor="#16c72e"
              textStyle={styles.tabBarSideButtonTextStyle}
            >
              Berater
            </CustomButton>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="StartUp"
            component={StartUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Highlights"
            component={Highlights}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CookieBanner"
            component={CookieBanner}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordReset"
            component={PasswordReset}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={UserSettings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashboardTabs"
            component={DashboardTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


const styles = StyleSheet.create({
  tabBarStyle: {
    height: 75,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarMainButtonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  tabBarSideButtonTextStyle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});