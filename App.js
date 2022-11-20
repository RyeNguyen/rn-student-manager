import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {store} from './src/app/store';

import HomeScreen from './src/screens/HomeScreen';
import StudentListScreen from './src/screens/StudentListScreen';
import SubjectListScreen from './src/screens/SubjectListScreen';
import AddStudentScreen from './src/screens/AddStudentScreen';
import AddSubjectScreen from './src/screens/AddSubjectScreen';
import StudentInfoScreen from './src/screens/StudentInfoScreen';
import SubjectInfoScreen from './src/screens/SubjectInfoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="StudentList"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="StudentList"
        component={StudentListScreen}
        // options={{
        //   tabBarShowLabel: false,
        //   tabBarIcon: () => <IconHome />,
        // }}
      />
      <Tab.Screen name="SubjectList" component={SubjectListScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="MainTab" component={MainTabs} />
          <Stack.Screen name="AddStudent" component={AddStudentScreen} />
          <Stack.Screen name="AddSubject" component={AddSubjectScreen} />
          <Stack.Screen name="StudentInfo" component={StudentInfoScreen} />
          <Stack.Screen name="SubjectInfo" component={SubjectInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
