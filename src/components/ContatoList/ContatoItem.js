import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class ContatoItem extends Component {

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.onPress(this.props.data);
	}

	render() {
		return(
			<TouchableHighlight underlayColor='#CCCCCC' style={styles.buttonArea} onPress={this.onClick} >
				<Text style={styles.btnTxext}>{this.props.data.name}</Text>
			</TouchableHighlight>
		);
	}

}

const styles = StyleSheet.create({
	buttonArea:{
		flex:1,
		backgroundColor:'#FFFFFF',
		marginBottom:10,
		height:40,
		width:200,
		justifyContent:'center',
		borderWidth:1,
		borderRadius:20
	},
	btnTxext:{
		color:'#000000',
		textAlign:'center',
		fontWeight:'bold'
	}
});