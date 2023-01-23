import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../Config/Theme';
import MessageToolbarStyles from './styles';

type MessageToolbarProp = {
  onPressSend: (messageContent: string) => any;
};

const MessageToolbar: FC<MessageToolbarProp> = ({onPressSend}) => {
  const {bottom} = useSafeAreaInsets();
  const [text, setText] = useState<string>('');

  const keyboardOffset = useRef(new Animated.Value(bottom));

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', event => {
      Animated.spring(keyboardOffset.current, {
        toValue: event.endCoordinates.height + bottom - 24,
        friction: 8,
        useNativeDriver: false,
      }).start();
    });

    Keyboard.addListener('keyboardWillHide', () => {
      Animated.spring(keyboardOffset.current, {
        toValue: bottom,
        friction: 8,
        useNativeDriver: false,
      }).start();
    });
  }, [bottom]);

  const onPressSendButton = () => {
    onPressSend(text);
    setText('');
  };

  const isEnabledSendButton = useMemo(() => !!text, [text]);

  const opacity = isEnabledSendButton ? 1 : 0.2;

  return (
    <Animated.View
      style={[
        MessageToolbarStyles.container,
        {
          marginBottom: keyboardOffset.current,
        },
      ]}>
      <View style={[MessageToolbarStyles.contentContainer]}>
        <View style={MessageToolbarStyles.inputContainer}>
          <TextInput
            placeholder="Type message..."
            value={text}
            onChangeText={setText}
            placeholderTextColor={Colors.black}
            multiline
            style={MessageToolbarStyles.input}
          />
        </View>
        <View style={MessageToolbarStyles.spacer} />
        <Pressable
          disabled={!isEnabledSendButton}
          onPress={onPressSendButton}
          style={[MessageToolbarStyles.sendButtonContainer, {opacity}]}>
          <Text style={MessageToolbarStyles.sendButtonTitle}>Send</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default MessageToolbar;
