import firebase from '../FirebaseConnection';

export const getChatList = ( userUid, callback ) => {
	return (dispatch) => {
		firebase.database().ref('users').child(userUid).child('chats').on('value', (snapshot) => {
			let chats = [];
			snapshot.forEach((childItem)=> {
				chats.push({
					key: childItem.key,
					title: childItem.val().title,
					other: childItem.val().other
				});
			});

			callback();

			dispatch({
				type: 'setChatList',
				payload: {
					chats: chats
				}
			});

		});
	};
};

export const getContactList = ( userUid, callback ) => {
	return (dispatch) => {
		firebase.database().ref('users').orderByChild('name').once('value').then((snapshot)=>{
			let users = [];
			snapshot.forEach((childItem)=>{
				if(childItem.key != userUid) {
					users.push({
						key:childItem.key,
						name:childItem.val().name
					});
				}
			});

			callback();

			dispatch({
				type:'setContactList', 
				payload:{
					users:users
				}
			});
		});
	};
};

export const createChat = ( userUid1, userUid2 ) => {
	return (dispatch) => {
		let newChat = firebase.database().ref('chats').push();

		// Criando o Chat
		newChat.child('members').child(userUid1).set({
			id:userUid1
		});
		newChat.child('members').child(userUid2).set({
			id:userUid2
		});	

		// Associando aos envolvidos
		let chatId = newChat.key;

		firebase.database().ref('users').child(userUid2).once('value').then((snapshot) => {
			firebase.database().ref('users').child(userUid1).child('chats').child(chatId).set({ 
				id: chatId,
				title: snapshot.val().name, // nome do userUid2
				other: userUid2
			});
		});
		
		firebase.database().ref('users').child(userUid1).once('value').then((snapshot)=> {
			firebase.database().ref('users').child(userUid2).child('chats').child(chatId).set({ 
				id: chatId,
				title: snapshot.val().name, // nome do userUid1
				other: userUid1
			}).then(()=>{
				dispatch({
					type:'setActiveChat',
					payload:{
						chatid:chatId
					}
				});				
			});
		});
	};
};

export const redirectChat = (chatId) => {
	return (dispatch) => {
		dispatch({
			type:'setActiveChat',
			payload:{
				chatid:chatId
			}
		});	
	};
}

export const setActiveChat = (chatId) => {
	return ({
		type: 'setActiveChat',
		payload: {
			chatid: chatId
		}
	});
};

export const sendImage = (blob, progressCallbak, successcallback) => {
	return (dispatch) => {
		let tmpKey = firebase.database().ref('chats').push().key;
		let fbimage = firebase.storage().ref().child('images').child(tmpKey);
		fbimage.put(blob, {contentType:'image/jpeg'})
			.on('state_changed', 
			progressCallbak,
			(error)=>{
				alert(error.code)
			},
			()=>{
				fbimage.getDownloadURL().then((url)=>{
					successcallback(url);
				});
			}
		)
	}
};


export const sendMessage = ( msgType, msgContent, author, chatAtivo ) => {
	return (dispatch) => {

		let currentDate = '';
		let cDate = new Date();
		let ano = cDate.getFullYear();
		let mes = cDate.getMonth()+1; if((mes/10)<1) {mes='0'+mes;}
		let dia = cDate.getDate(); if((dia/10)<1) {dia='0'+dia;}
		let hora = cDate.getHours(); if((hora/10)<1) {hora='0'+hora;}
		let minuto = cDate.getMinutes(); if((minuto/10)<1) {minuto='0'+minuto;}
		let segundo = cDate.getSeconds(); if((segundo/10)<1) {segundo='0'+segundo;}
		currentDate = ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo;

		let msgId = firebase.database().ref('chats').child(chatAtivo).child('messages').push();

		switch(msgType) {
			case 'text':
				msgId.set({
					msgType:'text',
					date:currentDate,
					m:msgContent,
					uid:author
				});
				break;
			case 'image':
				msgId.set({
					msgType:'image',
					date:currentDate,
					imgSource:msgContent,
					uid:author
				});
				break;
		}
	};
};

// recebimento das mensagens
export const monitorChat = ( chatAtivo ) => {
	return(dispatch) => {
		firebase.database().ref('chats').child(chatAtivo).child('messages').orderByChild('date').on('value', (snapshot)=>{
			let arrayMsg = [];

			snapshot.forEach((childItem)=>{

				switch(childItem.val().msgType) {
					case 'text':
						arrayMsg.push({
							key:childItem.key,
							date:childItem.val().date,
							msgType:'text',
							m:childItem.val().m,
							uid:childItem.val().uid
						});
						break;
					case 'image':
						arrayMsg.push({
							key:childItem.key,
							date:childItem.val().date,
							msgType:'image',
							imgSource:childItem.val().imgSource,
							uid:childItem.val().uid
						});
						break;
				}


			});

			dispatch({
				type:'setActiveChatMessage',
				payload:{
					'msgs':arrayMsg
				}
			});
		});
	};
};

export const monitorChatOff = ( chatAtivo ) => {
	return(dispatch) => {
		firebase.database().ref('chats').child(chatAtivo).child('messages').off();
	};	
};