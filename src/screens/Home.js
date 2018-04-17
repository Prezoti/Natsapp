import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';

export class Home extends Component {

	static navigationOptions = {
		title:'',
		header:null
	}

	constructor(props) {
		super(props);
		this.state = {};

		this.signinButtom = this.signinButtom.bind(this);
		this.signupButtom = this.signupButtom.bind(this);
	}

	signinButtom() {
		this.props.navigation.navigate('SignIn');
	}


	signupButtom() {
		this.props.navigation.navigate('SignUp');
	}

	render() {
		return (
			<ImageBackground source={require('../../assets/images/fundo.jpg')} style={styles.bg} >
				<StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} hidden={false} />
				<View style={styles.container}>
					<Text style={styles.texto1} >NatsApp</Text>
					<Text style={styles.texto2} >NatsApp</Text>

					<View style={styles.buttonArea}>
						<TouchableHighlight underlayColor='#CCCCCC' style={styles.button} onPress={this.signupButtom}>
							<Text style={styles.btnTxext}>Cadastrar</Text>
						</TouchableHighlight>
						<TouchableHighlight underlayColor='#CCCCCC' style={styles.button} onPress={this.signinButtom}>
							<Text style={styles.btnTxext}>Login</Text>
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
	texto1:{
		color:'#000000',
		fontWeight:'bold',
		fontSize:50
	},
	texto2:{
		marginTop:-69,
		marginLeft:5,
		color:'#FFFFFF',
		fontWeight:'bold',
		fontSize:50
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
		status:state.auth.status
	};
};

const HomeConnect = connect(mapStateToProps, { checkLogin })(Home);
export default HomeConnect;
