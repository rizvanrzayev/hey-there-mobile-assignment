import {StyleSheet} from 'react-native';
import {Colors} from '../../Config/Theme';

const MessageToolbarStyles = StyleSheet.create({
  container: {
    height: 60,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
  },
  sendButtonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
  },
  sendButtonTitle: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.black20,
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 14,
    flexWrap: 'wrap',
  },
  spacer: {
    width: 10,
  },
});

export default MessageToolbarStyles;
