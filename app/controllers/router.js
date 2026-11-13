import React from 'react';
import { View, Image, Text, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, { TAB_BAR_HEIGHT, colors } from './app.styles';
import { CustomTabBar } from './customTabBar';

import HomeView from '../views/HomeView';
import BreedView from '../views/BreedView';
import ShelterView from '../views/ShelterView';
import AdoptView from '../views/AdoptView';
import PetFilters from '../views/AdoptView/PetFilters';
import PetServices from '../views/PetServices';
import BreedProfile from '../views/BreedView/Profile';
import BreedFilters from '../views/BreedView/BreedFilters';
import SettingsView from '../views/MoreView/settings';
import CompanyView from '../views/MoreView/company';
import VolunteerView from '../views/MoreView/volunteer';
import TermsView from '../views/MoreView/terms';
import PrivacyView from '../views/MoreView/privacy';
import LicensesView from '../views/MoreView/licenses';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// The Hotline tab never renders: the custom tab bar dials the hotline instead.
const Empty = () => null;

const tabIcon = (name, size) => ({ color }) => (
    <Ionicons name={name} size={size || 30} color={color} />
);

function Tabs() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false, animation: 'none' }}
        >
            <Tab.Screen name="AdoptView" component={AdoptView}
                options={{ tabBarLabel: 'ADOPT', tabBarIcon: tabIcon('basket') }} />
            <Tab.Screen name="ShelterView" component={ShelterView}
                options={{ tabBarLabel: 'SHELTERS', tabBarIcon: tabIcon('home') }} />
            <Tab.Screen name="Hotline" component={Empty}
                options={{ tabBarLabel: null, tabBarIcon: () => (
                    <Ionicons name="medkit" size={TAB_BAR_HEIGHT} color="white" />
                ) }} />
            <Tab.Screen name="PetServices" component={PetServices}
                options={{ tabBarLabel: 'SERVICES', tabBarIcon: tabIcon('hand-left') }} />
            <Tab.Screen name="BreedView" component={BreedView}
                options={{ tabBarLabel: 'BREEDS', tabBarIcon: tabIcon('paw') }} />
        </Tab.Navigator>
    );
}

export function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}
        >
            <Stack.Screen name="Home" component={HomeView} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="PetFilters" component={PetFilters} />
            <Stack.Screen name="CompanyView" component={CompanyView} />
            <Stack.Screen name="SettingsView" component={SettingsView} />
            <Stack.Screen name="VolunteerView" component={VolunteerView} />
            <Stack.Screen name="TermsView" component={TermsView} />
            <Stack.Screen name="PrivacyView" component={PrivacyView} />
            <Stack.Screen name="BreedProfile" component={BreedProfile} />
            <Stack.Screen name="LicensesView" component={LicensesView} />
            <Stack.Screen name="BreedFilters" component={BreedFilters} />
        </Stack.Navigator>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
            <View style={styles.drawerHeader}>
                <Image style={styles.drawerImage}
                    source={require('../assets/paws1024_1024.png')} />
                <Text style={[styles.drawerText, { paddingLeft: 30, color: colors.primary }]}>{'Save'}
                    <Text style={[styles.drawerText, { color: colors.black }]}>{'a'}
                        <Text style={[styles.drawerText, { color: colors.primary }]}>{'Rescue'}
                            <Text style={[styles.drawerText, { color: colors.black }]}>{'.org'}</Text>
                        </Text>
                    </Text>
                </Text>
            </View>
            <View style={{ flex: 1, paddingTop: 15 }}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
}

const drawerItem = (label, icon) => ({
    drawerLabel: label,
    drawerIcon: () => <Ionicons name={icon} size={24} color={colors.primary} />,
});

export function TabsInDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="Main"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: { backgroundColor: colors.white },
                drawerActiveBackgroundColor: colors.white,
                drawerActiveTintColor: colors.black,
                drawerInactiveTintColor: colors.black,
                drawerHideStatusBarOnOpen: Platform.OS === 'ios',
            }}
        >
            <Drawer.Screen name="Main" component={AppNavigator} options={drawerItem('Home', 'home')} />
            <Drawer.Screen name="CompanyView" component={CompanyView} options={drawerItem('Company Information', 'information-circle')} />
            <Drawer.Screen name="SettingsView" component={SettingsView} options={drawerItem('Settings', 'settings')} />
            <Drawer.Screen name="TermsView" component={TermsView} options={drawerItem('Terms of Service', 'clipboard')} />
            <Drawer.Screen name="PrivacyView" component={PrivacyView} options={drawerItem('Privacy Policy', 'lock-closed')} />
            <Drawer.Screen name="LicensesView" component={LicensesView} options={drawerItem('Licenses', 'document-text')} />
            <Drawer.Screen name="VolunteerView" component={VolunteerView} options={drawerItem('Volunteer Information', 'people')} />
        </Drawer.Navigator>
    );
}
