import {createNavigationContainerRef} from '@react-navigation/native';
import {User} from '../Data/user';

export type RootStackParamList = {
  Chat: {user: User} | undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
