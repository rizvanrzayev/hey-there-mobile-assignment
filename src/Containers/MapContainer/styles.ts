import {
  CircleLayerStyle,
  FillLayerStyle,
  LineLayerStyle,
  SymbolLayerStyle,
} from '@rnmapbox/maps';
import {StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../Config/Theme';

interface CustomCalloutStyles {
  container: StyleProp<ViewStyle>;
  mapPinLayer: SymbolLayerStyle;
  mapView: StyleProp<ViewStyle>;
  circleLayer: CircleLayerStyle;
  circleLine: LineLayerStyle;
  circleFill: FillLayerStyle;
}

const MapContainerStyles: CustomCalloutStyles = {
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  circleLine: {
    lineColor: '#000000',
    lineWidth: 2,
  },
  circleFill: {
    fillColor: 'rgba(0,0,0,0.2)',
  },
  circleLayer: {
    circleRadiusTransition: {
      duration: 5000,
      delay: 0,
    },
    circleColor: Colors.primary,
    circleRadius: 20,
  },
  mapPinLayer: {
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
    iconSize: 1.0,
  },
};

export default MapContainerStyles;
