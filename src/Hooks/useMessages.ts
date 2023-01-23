import {useContext} from 'react';
import {MessageContext} from '../Components/Contexts/MessageContext';

function useMessages() {
  const {messages, getMessagesByUser, sendMessage, newMessage} =
    useContext(MessageContext);
  return {messages, getMessagesByUser, sendMessage, newMessage};
}

export default useMessages;
