import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
import middleware from './middlewares'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {AsyncStorage, StatusBar} from "react-native";
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import QuizResult from './components/QuizResult'
import {handleInitialData,DECKS_STORAGE_KEY} from './actions/Decks'
import {setNotification} from './utils/notification'

const configStore = () => {
    const store = createStore(reducer, middleware);

    store.subscribe(() => {
        const currentStore = store.getState()
        // @ts-ignore
        AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(currentStore.decks))
    });

    return store;
};

const store = configStore();
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function DecksNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Decks" component={DeckList} />
            <Tab.Screen name="New Deck" component={NewDeck} />
        </Tab.Navigator>
    );
}

class App extends Component {

    componentDidMount() {
        store.dispatch(handleInitialData())
        setNotification()
    }

    render(){
        return (
            <Provider store={store}>
                <SafeAreaProvider>
                    <StatusBar backgroundColor="white" barStyle="dark-content"/>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Decks">
                            <Stack.Screen name="Decks" options={{headerShown:false}} component={DecksNavigator} />
                            <Stack.Screen name="Deck" component={Deck} />
                            <Stack.Screen name="New Card" component={NewCard} />
                            <Stack.Screen name="Quiz" component={Quiz} />
                            <Stack.Screen name="Quiz Results" component={QuizResult} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </Provider>
        )
    }
}

export default App
