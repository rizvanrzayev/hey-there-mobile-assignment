import React, {FC, useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StepperStyles} from './styles';

type StepperProps = {
  value: number;
  label: (value: number) => string;
  onChangeValue: (value: number) => any;
};

type StepperButtonProps = {
  title: string;
  onPress: () => {};
};

const Stepper: FC<StepperProps> = ({value, label, onChangeValue}) => {
  const {bottom} = useSafeAreaInsets();

  const renderButton = useCallback(
    ({title, onPress}: StepperButtonProps) => (
      <Pressable onPress={onPress} style={StepperStyles.button}>
        <Text style={StepperStyles.buttonTitle}>{title}</Text>
      </Pressable>
    ),
    [],
  );

  return (
    <View style={[StepperStyles.container, {bottom: bottom + 20}]}>
      {renderButton({title: '+', onPress: () => onChangeValue(value + 1)})}
      <View style={StepperStyles.titleContainer}>
        <Text style={StepperStyles.title}>{label(value)}</Text>
      </View>
      {renderButton({title: '-', onPress: () => onChangeValue(value - 1)})}
    </View>
  );
};

export default Stepper;
