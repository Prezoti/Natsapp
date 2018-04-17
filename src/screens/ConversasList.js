import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import { connect } from 'react-redux';

export class ConversasList extends Component {

	static navigationOptions = {
		title:'',
		tabBarLabel:'Conversas',
		header:null
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidUpdate() {
		alert('Entrou no update');
		if(this.props.activeChat != '') {
			this.props.navigation.navigate('ConversaInterna');
		}		
	}

	render() {
		return (
			<ImageBackground opacity={0.1} source={require('../../assets/images/fundo.jpg')} style={styles.bg} >
				<View style={styles.container}>
					<Text>PAGINA CONVERSAS... {this.props.status} - {this.props.uid} </Text>
					<Button title="Ir para Interna" onPress={()=>{
						this.props.navigation.navigate('ConversaInterna');
					}} />
				</View>
			</ImageBackground>
		);
	}

}

const styles = StyleSheet.create({
	bg:{
		flex:1,
		width:null
	},	
	container:{
		margin:10
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		uid:state.auth.uid,
		activeChat:state.chat.ActiveChat
	};
};

const ConversasListConnect = connect(mapStateToProps, { })(ConversasList);
export default ConversasListConnect;
















