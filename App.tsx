import React from 'react';
import { Text, View } from 'react-native';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
import middleware from './middlewares'

const store = createStore(reducer, middleware);

export default function App() {
  return (
      <Provider store={store}>
          <View>
              <Text style={{margin:50}}>App</Text>
          </View>
      </Provider>
  );
}
