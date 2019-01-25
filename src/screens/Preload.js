import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';

export class Preload extends Component {

	static navigationOptions = {
		title:'',
		header:null
	}

	constructor(props) {
		super(props);
		this.state = {};

		this.directPages = this.directPages.bind(this);

		this.props.checkLogin();

		window.globalNavigator = this.props.navigation;
	}

	directPages() {

		switch(this.props.status) {
			case 1:

				this.props.navigation.dispatch(StackActions.reset({
					index:0,
					actions:[
						NavigationActions.navigate({routeName:'Conversas'})
					]
				}));

				break;
			case 2:

				this.props.navigation.dispatch(StackActions.reset({
					index:0,
					actions:[
						NavigationActions.navigate({routeName:'Home'})
					]
				}));

				break;
		}

	}

	componentDidMount() {
		this.directPages();
	}

	componentDidUpdate() {
		this.directPages();
	}

	render() {
		return (
			<ImageBackground source={require('../assets/images/fundo.jpg')} style={styles.bg} >
				<View style={styles.container}>
					<Image source={require('../assets/images/logo.png')} style={styles.logo} />
					<Text style={styles.appname} >NatsApp</Text>
					<Text style={styles.texto} >Carregando...</Text>
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
	texto:{
		fontSize:20,
		fontWeight:'bold'
	},
	logo:{
		width:54,
		height:73,
		marginBottom:20,
		opacity:0.9
	},
	appname:{
		fontSize:30,
		marginBottom:20,
		color:'#000000',
		fontWeight:'bold'
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status
	};
};

const PreloadConnect = connect(mapStateToProps, { checkLogin })(Preload);
export default PreloadConnect;
