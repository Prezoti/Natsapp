import React, { Component } from 'react';
import { Modal, View, KeyboardAvoidingView, Platform, Text, StyleSheet, ImageBackground, TouchableHighlight, Image, BackHandler, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat, sendMessage, monitorChat, monitorChatOff, sendImage } from '../actions/ChatActions';
import MensagemItem from '../components/ConversaInterna/MensagemItem';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

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
			inputText:'',
			pct:0,
			modalVisible:false,
			modalImage:null
		};

		this.voltar = this.voltar.bind(this);
		this.sendMsg = this.sendMsg.bind(this);
		this.chooseImage = this.chooseImage.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.imagePress = this.imagePress.bind(this);
	}

	componentDidMount() {
		this.props.navigation.setParams({voltarFunction:this.voltar});
		BackHandler.addEventListener('hardwareBackPress', this.voltar);

		this.props.monitorChat(this.props.chatAtivo);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.voltar);
	}

	setModalVisible(status) {
		let state = this.state;
		state.modalVisible = status;
		this.setState(state);
	}

	imagePress(img) {
		let state = this.state;
		state.modalImage = img;
		this.setState(state);

		this.setModalVisible(true);
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
			this.props.sendMessage('text', txt, this.props.uid, this.props.chatAtivo);
		}
	}

	chooseImage() {
		ImagePicker.showImagePicker(null, (r)=>{
			if(r.uri) {
				let uri = r.uri.replace('file://', '');   // correção necessário para iOS
				RNFetchBlob.fs.readFile(uri, 'base64')
				.then((data)=>{
					return RNFetchBlob.polyfill.Blob.build(data, {type:'image/jpeg;BASE64'});
				})
				.then((blob)=>{
					this.props.sendImage(
						blob, 
						(snapshot)=>{
							let pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							let state = this.state;
							state.pct = pct;
							this.setState(state);
						},
						(imgName)=>{
							let state = this.state;
							state.pct = 0;
							this.setState(state);							
							this.props.sendMessage('image', imgName, this.props.uid, this.props.chatAtivo);
					})
				});
			}
		});
	}

	render() {
		let areaBehavior = Platform.select({ios:'padding', android:null});
		let areaOffset = Platform.select({ios:64, android:null});

		return (
			<ImageBackground opacity={0.5} source={require('../assets/images/fundo.jpg')} style={styles.bg} >
				<KeyboardAvoidingView style={styles.container} behavior={areaBehavior} keyboardVerticalOffset={areaOffset} >
					<FlatList 
						ref={(ref)=>{this.chatArea = ref}} 	// cria referencia para controle do objeto
						onContentSizeChange={()=>{this.chatArea.scrollToEnd({animated:true})}}
						onLayout={()=>{this.chatArea.scrollToEnd({animated:true})}}
						style={styles.chatArea}
						data={this.props.activeChatMessages}
						renderItem={({item})=><MensagemItem data={item} me={this.props.uid} onImagePress={this.imagePress} />}
					/>

					{this.state.pct > 0 &&
						<View style={styles.imageTmp} >
							<View style={[{width:this.state.pct+'%'}, styles.imageTmpBar]} ></View>
						</View>
					}

					<View style={styles.sendArea} >
						<TouchableHighlight underlayColor='#CCCCCC' style={styles.imageButton} onPress={this.chooseImage} >
							<Image style={styles.imageBtnImage} source={require('../assets/images/camera.png')} />			
						</TouchableHighlight>					
						<TextInput style={styles.sendInput} value={this.state.inputText} onChangeText={(inputText)=>this.setState({inputText})} />
						<TouchableHighlight underlayColor='#CCCCCC' style={styles.sendButton} onPress={this.sendMsg} >
							<Image style={styles.sendImage} source={require('../assets/images/send.png')} />			
						</TouchableHighlight>						
					</View>

					<Modal animationType="slide" transparent={false} visible={this.state.modalVisible} >
						<ImageBackground opacity={1} source={require('../assets/images/fundo.jpg')} style={styles.bg} >
							<TouchableHighlight underlayColor='transparent' style={styles.setModalVisible} onPress={()=>{ this.setModalVisible(false) }} >	
								<Image resizeMode="contain" style={styles.modalImage} source={{uri:this.state.modalImage}} />		
							</TouchableHighlight>	
						</ImageBackground>						
					</Modal>

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
	imageButton:{
		height:50,
		width:50,
		justifyContent:'center',
		alignItems:'center'		
	},	
	sendImage:{
		width:40,
		height:40
	},
	imageBtnImage:{
		width:40,
		height:40
	},
	imageTmp:{
		height:10
	},
	imageTmpBar:{
		height:10,
		backgroundColor:'#555555'
	},
	setModalVisible:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	modalImage:{
		width:'100%',
		height:'100%'
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

const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat, sendMessage, monitorChat, monitorChatOff, sendImage })(ConversaInterna);
export default ConversaInternaConnect;
















