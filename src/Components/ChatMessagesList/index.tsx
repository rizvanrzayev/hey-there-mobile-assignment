import React, {FC} from 'react';
import {FlatList, Text, View} from 'react-native';
import {MY_USER_DATA} from '../../Data/user';
import {Message} from '../Contexts/MessageContext';
import {ChatMessageListStyles, ChatMessageListItemStyles} from './styles';

interface ChatMessageListProps {
  messages: Message[];
}

interface ChatMessageListItemProps {
  item: Message;
}

const ChatMessageListItem: FC<ChatMessageListItemProps> = ({item}) => {
  const isCurrentSender = MY_USER_DATA.id === item.receiverId;
  const position: 'left' | 'right' = isCurrentSender ? 'left' : 'right';

  return (
    <View style={ChatMessageListItemStyles[position].container}>
      <View style={ChatMessageListItemStyles[position].wrapper}>
        <Text style={ChatMessageListItemStyles[position].title}>
          {item.content}
        </Text>
      </View>
    </View>
  );
};

const ChatMessageList: FC<ChatMessageListProps> = ({messages}) => {
  const renderItem = ({item}: {item: Message}) => {
    return <ChatMessageListItem item={item} />;
  };

  return (
    <View style={ChatMessageListStyles.container}>
      <FlatList<Message>
        inverted
        data={messages}
        renderItem={renderItem}
        style={ChatMessageListStyles.listContentContainer}
      />
    </View>
  );
};

export default ChatMessageList;
