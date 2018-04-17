import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

export class ConversaInterna extends Component {

	static navigationOptions = {
		title:'Conversa Interna'
	}

	constructor(props) {
		super(props);
		this.state = {};

	}

	render() {
		return (
			<ImageBackground opacity={0.1} source={require('../../assets/images/fundo.jpg')} style={styles.bg} >
				<View style={styles.container}>
					<Text>PAGINA CONVERSA INTERNA...</Text>
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
		uid:state.auth.uid
	};
};

const ConversaInternaConnect = connect(mapStateToProps, { })(ConversaInterna);
export default ConversaInternaConnect;
















