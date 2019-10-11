import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/home';
import DictionaryTrainingScreen from '../screens/training/dicitionary';

import DictionariesScreen from '../screens/dictionaries';
import CreateDictionaryScreen from '../screens/dictionaries/create';
import PreviewDictionaryScreen from '../screens/dictionaries/preview';
import SettingsDictionaryScreen from '../screens/dictionaries/settings';
import SettingsScreen from '../screens/settings';

const config = Platform.select({
  default: {
    headerMode: 'float'
  }
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    DictionaryTraining: DictionaryTrainingScreen
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
    Dictionary: DictionariesScreen,
    CreateDictionary: CreateDictionaryScreen,
    PreviewDictionary: PreviewDictionaryScreen,
    SettingsDictionary: SettingsDictionaryScreen
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

DictionariesScreen.path = '';

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
