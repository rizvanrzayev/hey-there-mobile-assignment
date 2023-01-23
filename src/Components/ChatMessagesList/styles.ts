import {StyleSheet} from 'react-native';
import {Colors} from '../../Config/Theme';

const ChatMessageListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: Colors.primary,
  },
  itemContent: {
    color: Colors.white,
  },
  itemContentContainer: {
    backgroundColor: 'red',
    padding: 10,
  },
});

const ChatMessageListItemStyles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: Colors.white,
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    title: {
      fontSize: 16,
      lineHeight: 20,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 10,
      marginRight: 10,
      color: Colors.black,
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: Colors.black,
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    title: {
      fontSize: 16,
      lineHeight: 20,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 10,
      marginRight: 10,
      color: Colors.white,
    },
  }),
};

export {ChatMessageListStyles, ChatMessageListItemStyles};
