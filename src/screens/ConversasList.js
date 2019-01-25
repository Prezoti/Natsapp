import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getChatList, setActiveChat } from '../actions/ChatActions';
import ConversasItem from '../components/ConversasList/ConversasItem';

export class ConversasList extends Component {

	static navigationOptions = {
		title:'Conversas',
		tabBarLabel:'Conversas'
	}

	constructor(props) {
		super(props);
		this.state = {
			loading:true
		};

		this.conversasClick = this.conversasClick.bind(this);

		this.props.getChatList( this.props.uid, ()=>{
			this.setState({loading:false});
		});
	}

	componentDidUpdate() {
		if(this.props.chatAtivo != '') {
			//alert('Entrou no update');
			this.props.navigation.navigate('ConversaInterna', {title:this.props.tituloChatAtivo});
		}
	}

	conversasClick(data) {
		//alert("Clicou em "+data.key);
		this.props.setActiveChat(data.key);
	}

	render() {
		return (
			<ImageBackground opacity={0.5} source={require('../assets/images/fundo.jpg')} style={styles.bg} >
				<View style={styles.container}>
					{this.state.loading && <ActivityIndicator size="large" />}
					<FlatList 
					data={this.props.chats}
					renderItem={({item})=> <ConversasItem data={item} onPress={this.conversasClick} /> }
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
		status:state.auth.status,
		uid:state.auth.uid,
		chatAtivo:state.chat.chatAtivo,
		tituloChatAtivo:state.chat.tituloChatAtivo,
		chats: state.chat.chats
	};
};

const ConversasListConnect = connect(mapStateToProps, { getChatList, setActiveChat })(ConversasList);
export default ConversasListConnect;
















