import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getContactList, createChat, redirectChat } from '../actions/ChatActions';
import ContatoItem from '../components/ContatoList/ContatoItem';

export class ContatoList extends Component {

	static navigationOptions = {
		title:'',
		tabBarLabel:'Contatos',
		header:null
	}

	constructor(props) {
		super(props);
		this.state = {
			loading:true
		};

		this.props.getContactList(this.props.uid, ()=>{			
			this.setState({loading:false});
		});

		this.contatoClick = this.contatoClick.bind(this);
	}

	contatoClick(item) {

		let found = false;
		let chat_id = '';

		for(var i in this.props.chats) {
			if(this.props.chats[i].other == item.key) {
				found = true;
				chat_id = this.props.chats[i].key;
			}
		}

		if(found == false) {
			this.props.createChat(this.props.uid, item.key);
			this.props.navigation.navigate('ConversasStack');
		} else {
			//alert("já existe um chat com esse usuário");
			//alert(chat_id);
			this.props.redirectChat(chat_id);
		}
	}

	render() {
		return (
			<ImageBackground opacity={0.5} source={require('../assets/images/fundo.jpg')} style={styles.bg} >
				<View style={styles.container}>
					{this.state.loading && <ActivityIndicator size="large" />}
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
		contacts:state.chat.contacts,
		chats:state.chat.chats
	};
};

const ContatoListConnect = connect(mapStateToProps, { getContactList, createChat, redirectChat })(ContatoList);
export default ContatoListConnect;
















