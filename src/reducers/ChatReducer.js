const initialState = {
    chats: [],	
    contacts: [],
    chatAtivo:'',
    tituloChatAtivo:'',
    activeChatMessages:[]
};

const ChatReducer = (state = initialState, action) => {

    if(action.type == 'setChatList') {
        return { ...state, chats: action.payload.chats};
    }

	if(action.type == 'setContactList') {
		return { ...state, contacts:action.payload.users};
	}

	if(action.type == 'setActiveChat') {
		let chatTitle = '';

		for(var i in state.chats) {
			if(state.chats[i].key == action.payload.chatid) {
				chatTitle = state.chats[i].title;
			}
		}

		return { ...state, chatAtivo:action.payload.chatid, tituloChatAtivo:chatTitle};
	}

	if(action.type == 'setActiveChatMessage') {
		return { ...state, activeChatMessages:action.payload.msgs};
	}	

	return state;
};

export default ChatReducer;