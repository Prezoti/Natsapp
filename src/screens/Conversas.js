import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
//import { connect } from 'react-redux';

import ConversasStack from './ConversasStack';
import ContatoList from './ContatoList';
import Config from './Config';



const ConversasNavigator = TabNavigator({
	ConversasStack:{
		screen:ConversasStack, 
		navigationOptions:{
			tabBarLabel:'Conversas'
		}
	},
	ContatoList:{
		screen:ContatoList
	},
	Config:{
		screen:Config
	}
},{
	tabBarPosition:'bottom',
	animationEnable:false,
	swipeEnable:false,
	tabBarOptions: {
		activeTintColor: 'white',
		inactiveTintColor: 'lightgray',
		labelStyle: {
			fontSize: 15
		},
		style: {
			backgroundColor: 'grey',
			borderTopWidth: 1,
			borderTopColor: 'white'
		},
	}
});

export default ConversasNavigator;