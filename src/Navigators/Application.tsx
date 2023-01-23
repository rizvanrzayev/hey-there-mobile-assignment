import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatContainer from '../Containers/ChatContainer';
import MapContainer from '../Containers/MapContainer';
import {navigationRef} from './utils';
import MessageProvider from '../Providers/MessageProvider';

const Stack = createNativeStackNavigator();

const ApplicationNavigator = (): JSX.Element => {
  return (
    <MessageProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen name="Map" component={MapContainer} />
          <Stack.Screen name="Chat" component={ChatContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </MessageProvider>
  );
};

export default ApplicationNavigator;
