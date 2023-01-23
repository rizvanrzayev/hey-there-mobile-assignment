import React, {FC, useEffect, useRef} from 'react';
import {Animated, Pressable, Text, View} from 'react-native';
import {User} from '../../Data/user';
import MapUserItemStyles from './styles';

type MapUserItemProps = {
  title: string;
  user: User;
  onPress: (user: User) => any;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MapUserItem: FC<MapUserItemProps> = ({title, user, onPress}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    return () => {
      fadeAnim.setValue(0);
    };
  }, [fadeAnim]);

  return (
    <AnimatedPressable
      onPress={() => onPress(user)}
      style={[MapUserItemStyles.container, {opacity: fadeAnim}]}>
      <Text style={MapUserItemStyles.label}>
        {user.name.charAt(0)}
        {user.name.charAt(1)}
      </Text>
      <View style={MapUserItemStyles.titleContainer}>
        <Text style={MapUserItemStyles.title}>{title}</Text>
      </View>
    </AnimatedPressable>
  );
};

export default MapUserItem;
