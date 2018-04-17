import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getContactList, createChat } from '../actions/ChatActions';
import ContatoItem from '../components/ContatoList/ContatoItem';

export class ContatoList extends Component {

	static navigationOptions = {
		title:'',
		tabBarLabel:'Contatos',
		header:null
	}

	constructor(props) {
		super(props);
		this.state = {};

		this.props.getContactList(this.props.uid);

		this.contatoClick = this.contatoClick.bind(this);
	}

	contatoClick(item) {
		this.props.createChat(this.props.uid, item.key);
		this.props.navigation.navigate('ConversasStack');
	}

	render() {
		return (
			<ImageBackground opacity={0.1} source={require('../../assets/images/fundo.jpg')} style={styles.bg} >
				<View style={styles.container}>
					<FlatList
						data={this.props.contacts}
						renderItem={({item})=><ContatoItem data={item} onPress={this.contatoClick} />}
					/>
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
		alignItems:'center',
		margin:10
	}
});

const mapStateToProps = (state) => {
	return {
		uid:state.auth.uid,
		contacts:state.chat.contacts
	};
};

const ContatoListConnect = connect(mapStateToProps, { getContactList, createChat })(ContatoList);
export default ContatoListConnect;
















