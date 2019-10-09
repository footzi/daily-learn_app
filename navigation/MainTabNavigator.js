import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/home';
import DictionaryScreen from '../screens/dictionary';
import CreateDictionaryScreen from '../screens/dictionary/create';
import SettingsScreen from '../screens/settings';

const config = Platform.select({
  default: {
    headerMode: 'float'
  }
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Главная',
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-school' : 'md-school'} />
  )
};

HomeStack.path = '';

const DictionaryStack = createStackNavigator(
  {
    Dictionary: DictionaryScreen,
    CreateDictionary: CreateDictionaryScreen
  },
  config
);

DictionaryStack.navigationOptions = {
  tabBarLabel: 'Словари',
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'} />
};

DictionaryScreen.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Настройки',
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  )
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  DictionaryStack,
  SettingsStack
});

tabNavigator.path = '';

export default tabNavigator;
