import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { SignOut } from '../actions/AuthActions'

export class Config extends Component {

	static navigationOptions = {
		title:'',
		tabBarLabel:'Config',
		header:null
	}

	constructor(props) {
		super(props);
		this.state = {};

		this.sair = this.sair.bind(this);
	}

	sair() {
		this.props.SignOut();

		window.globalNavigator.navigate('Home');

		/*
		// a linha acima substituiu o bloco abaixo
		// pois houve reestruturação dos navigatios que fez 
		// haver mudancas de niveis ai foi criado uma navegacao global com window
		this.props.navigation.dispatch(NavigationActions.reset({
			index:0,
			actions:[
				NavigationActions.navigate({routeName:'Home'}) //Home
			]
		}));
		*/
	}

	render() {
		return (
			<ImageBackground opacity={0.1} source={require('../assets/images/fundo.jpg')} style={styles.bg} >
				<View style={styles.container}>
					<Text>PAGINA CONFIG...</Text>

					<View style={styles.buttonArea}>
						<TouchableHighlight underlayColor='#CCCCCC' style={styles.button} onPress={this.sair}>
							<Text style={styles.btnTxext}>Sair</Text>
						</TouchableHighlight>
					</View>

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
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	buttonArea:{
		flexDirection:'row',
		marginTop:30
	},
	button:{
		backgroundColor:'#FFFFFF',
		margin:10,
		height:40,
		width:100,
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

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		uid:state.auth.uid
	};
};

const ConfigConnect = connect(mapStateToProps, { SignOut })(Config);
export default ConfigConnect;
















