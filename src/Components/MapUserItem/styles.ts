import {StyleSheet} from 'react-native';
import {Colors} from '../../Config/Theme';

const itemSize = 70;

const MapUserItemStyles = StyleSheet.create({
  container: {
    width: itemSize,
    height: itemSize,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: itemSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  titleContainer: {
    position: 'absolute',
    width: itemSize - 10,
    height: 20,
    bottom: -5,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default MapUserItemStyles;
