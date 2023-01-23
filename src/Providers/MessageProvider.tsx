import React, {FC, useCallback, useState} from 'react';
import {
  Message,
  MessageContext,
  MessageContextState,
} from '../Components/Contexts/MessageContext';

type MessageProviderProps = {
  children: any;
};

const MessageProvider: FC<MessageProviderProps> = ({children}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: 'aaa',
      receiverId: '2',
    },
  ]);

  const contextValue: MessageContextState = {
    messages,
    setMessages,
    sendMessage: useCallback((receiverId: string, content: string) => {
      setMessages(prevMessages => [{content, receiverId}, ...prevMessages]);
    }, []),
    getMessagesByUser: (userId: string) =>
      messages.filter(message => message.receiverId === userId),
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
