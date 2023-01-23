import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {Animated} from 'react-native';
import ChatMessageList from '../../Components/ChatMessagesList';
import MessageToolbar from '../../Components/MessageToolbar';
import {User} from '../../Data/user';
import useMessages from '../../Hooks/useMessages';
import ChatContainerStyles from './styles';

type ChatContainerRouteParams = {
  user: User;
};

const ChatContainer = () => {
  const {params} = useRoute<RouteProp<{params: ChatContainerRouteParams}>>();
  const user: User = params.user;

  const {getMessagesByUser, sendMessage} = useMessages();

  const messages = useMemo(
    () => getMessagesByUser?.(user.id) || [],
    [getMessagesByUser, user.id],
  );

  const onPressSend = useCallback(
    (content: string) => {
      sendMessage?.(user.id, content);
    },
    [sendMessage, user.id],
  );

  return (
    <Animated.View style={ChatContainerStyles.container}>
      {useMemo(
        () => (
          <ChatMessageList messages={messages} />
        ),
        [messages],
      )}
      {useMemo(
        () => (
          <MessageToolbar onPressSend={onPressSend} />
        ),
        [onPressSend],
      )}
    </Animated.View>
  );
};

export default ChatContainer;
