import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Platform, Text, StyleSheet, ImageBackground, TouchableHighlight, Image, BackHandler, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat, sendMessage, monitorChat, monitorChatOff } from '../actions/ChatActions';
import MensagemItem from '../components/ConversaInterna/MensagemItem';

export class ConversaInterna extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title,
		tabBarVisible: false,
		headerLeft: (
			<TouchableHighlight onPress={() => {navigation.state.params.voltarFunction()}} underlayColor={false}>
				<Image source={require('react-navigation/src/views/assets/back-icon.png')} style={{ width: 25, height: 25, marginLeft: 20 }} />
			</TouchableHighlight>
		)
	});

	constructor(props) {
		super(props);
		this.state = {
			inputText:''
		};

		this.voltar = this.voltar.bind(this);
		this.sendMsg = this.sendMsg.bind(this);
	}

	componentDidMount() {
		this.props.navigation.setParams({voltarFunction:this.voltar});
		BackHandler.addEventListener('hardwareBackPress', this.voltar);

		this.props.monitorChat(this.props.chatAtivo);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.voltar);
	}

	voltar() {
		this.props.monitorChatOff(this.props.chatAtivo);
		this.props.setActiveChat('');
		this.props.navigation.goBack();

		return true;  // para não fechar o aplicativo
	}

	sendMsg() {
		let txt = this.state.inputText;
		let state = this.state;
		state.inputText = '';
		this.setState(state);

		if(txt != '') {
			this.props.sendMessage(txt, this.props.uid, this.props.chatAtivo)
		}
	}

	render() {
		let areaBehavior = Platform.select({ios:'padding', android:null});
		let areaOffset = Platform.select({ios:64, android:null});

		return (
			<ImageBackground opacity={0.1} source={require('../assets/images/fundo.jpg')} style={styles.bg} >
				<KeyboardAvoidingView style={styles.container} behavior={areaBehavior} keyboardVerticalOffset={areaOffset} >
					<FlatList 
						ref={(ref)=>{this.chatArea = ref}} 	// cria referencia para controle do objeto
						onContentSizeChange={()=>{this.chatArea.scrollToEnd({animated:true})}}
						onLayout={()=>{this.chatArea.scrollToEnd({animated:true})}}
						style={styles.chatArea}
						data={this.props.activeChatMessages}
						renderItem={({item})=><MensagemItem data={item} me={this.props.uid} />}
					/>
					<View style={styles.sendArea} >
						<TextInput style={styles.sendInput} value={this.state.inputText} onChangeText={(inputText)=>this.setState({inputText})} />
						<TouchableHighlight underlayColor='#CCCCCC' style={styles.sendButton} onPress={this.sendMsg} >
							<Image style={styles.sendImage} source={require('../assets/images/send.png')} />			
						</TouchableHighlight>						
					</View>
				</KeyboardAvoidingView>
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
		flex:1
	},
	chatArea:{
		flex:1
	},
	sendArea:{
		height:50,
		flexDirection:'row',
		backgroundColor:'#FFFFFF',
		borderTopWidth:1
	},
	sendInput:{
		flex:1,
		height:50,
		marginLeft:5
	},
	sendButton:{
		height:50,
		width:50,
		justifyContent:'center',
		alignItems:'center'
	},
	sendImage:{
		width:40,
		height:40
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		uid:state.auth.uid,
		chatAtivo:state.chat.chatAtivo,
		activeChatMessages:state.chat.activeChatMessages
	};
};

const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat, sendMessage, monitorChat, monitorChatOff })(ConversaInterna);
export default ConversaInternaConnect;
















