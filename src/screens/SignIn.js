import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TextInput, TouchableHighlight, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import LoadingItem from '../components/LoadingItem';
import { checkLogin, changeEmail, changePassword, SignInAction } from '../actions/AuthActions';

export class SignIn extends Component {

	static navigationOptions = {
		title:'Login'
	}

	constructor(props) {
		super(props);
		this.state = {
			loading:false
		};
	}

	componentDidUpdate() {
		if(this.props.status == 1) {
			Keyboard.dismiss();
			this.props.navigation.navigate('Conversas');
		}
	}

	render() {
		return (
			<ImageBackground source={require('../assets/images/fundo.jpg')} style={styles.bg} >
				<StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} hidden={false} />
				<View style={styles.container}>
					<View style={styles.textArea} >

						<Text style={styles.texto} >Digite seu e-mail</Text>
						<TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail} />

						<Text style={styles.texto} >Digite sua senha</Text>
						<TextInput secureTextEntry={true} style={styles.input} value={this.props.password} onChangeText={this.props.changePassword} />	

						<View style={styles.buttonArea}>
							<TouchableHighlight underlayColor='#CCCCCC' style={styles.button} onPress={()=>{
								this.setState({loading:true});
								this.props.SignInAction(this.props.email, this.props.password, ()=>{
									this.setState({loading:false});
								});
							}}>
								<Text style={styles.btnTxext}>Entrar</Text>
							</TouchableHighlight>
						</View>											
					</View>

					<LoadingItem visible={this.state.loading} />
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
	textArea:{
		width:300,
		height:200,
		backgroundColor:'rgba(255,255,255,0.7)',
		borderWidth:1,
		borderRadius:10,
		padding:10	
	},
	texto:{
		color:'#000000',
		fontWeight:'bold',
		marginBottom:2,
		marginTop:5,
		marginLeft:12
	},
	input:{
		height:35,
		backgroundColor:'#EEEEEE',
		marginLeft:10,
		marginRight:10,
		borderRadius:10,
		borderWidth:1,
		paddingLeft:5,
		paddingRight:5	
	},
	buttonArea:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	button:{
		backgroundColor:'#EEEEEE',
		marginTop:10,
		height:34,
		width:100,
		justifyContent:'center',
		borderWidth:1,
		borderRadius:17
	},
	btnTxext:{
		color:'#000000',
		textAlign:'center',
		fontWeight:'bold'
	}		
});

const mapStateToProps = (state) => {
	return {
		uid:state.auth.uid,
		email:state.auth.email,
		password:state.auth.password,
		status:state.auth.status
	};
};

const SignInConnect = connect(mapStateToProps, { checkLogin, changeEmail, changePassword, SignInAction })(SignIn);
export default SignInConnect;
