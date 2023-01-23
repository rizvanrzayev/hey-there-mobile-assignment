import {StyleSheet} from 'react-native';
import {Colors} from '../../Config/Theme';

export const stepperHeight = 50;
const containerPadding = 5;
const buttonSize = stepperHeight - containerPadding * 2;

export const StepperStyles = StyleSheet.create({
  container: {
    width: 170,
    height: stepperHeight,
    borderRadius: stepperHeight / 2,
    backgroundColor: Colors.white,
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: containerPadding,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: Colors.primary,
    borderRadius: buttonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.white,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
