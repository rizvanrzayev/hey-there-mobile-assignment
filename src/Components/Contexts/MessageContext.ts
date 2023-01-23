import {createContext} from 'react';

export type Message = {
  content: string;
  receiverId: string;
};

export interface MessageContextState {
  messages: Message[];
  setMessages?: any;
  sendMessage?: (receiverId: string, content: string) => any;
  getMessagesByUser?: (userId: string) => Message[];
  newMessage?: Message;
}

const initial: MessageContextState = {
  messages: [],
};

export const MessageContext = createContext(initial);
