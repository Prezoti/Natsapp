import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { NavigationActions } from 'react-navigation';
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

				this.props.navigation.dispatch(NavigationActions.reset({
					index:0,
					actions:[
						NavigationActions.navigate({routeName:'Conversas'})
					]
				}));

				break;
			case 2:

				this.props.navigation.dispatch(NavigationActions.reset({
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
					<Text style={styles.texto} >Carregando... {this.props.status}</Text>
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
	},
	texto:{
		fontSize:20,
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
