import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { MessageBar } from 'react-native-messages';
import { TabsInDrawer } from './router';
import store from '../data/store';

// Use TabsInDrawer if we want a Drawer from the left, otherwise just Tabs at
// the bottom
class App extends Component {
    render() {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <StatusBar barStyle="dark-content" />
                    <Provider store={store}>
                        <NavigationContainer>
                            <TabsInDrawer />
                        </NavigationContainer>
                    </Provider>
                    <MessageBar />
                </SafeAreaProvider>
            </GestureHandlerRootView>
        );
    }
}

export default App;
