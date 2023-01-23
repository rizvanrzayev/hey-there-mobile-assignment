import MapboxGL from '@rnmapbox/maps';
import React, {useCallback, useMemo, useReducer, useRef} from 'react';
import MapContainerStyles from './styles';
import * as turf from '@turf/turf';
import {View} from 'react-native';
import {UserTrackingMode} from '@rnmapbox/maps/javascript/components/Camera';
import {User, getUsers} from '../../Data/user';
import {navigationRef} from '../../Navigators/utils';
import Stepper from '../../Components/Stepper';
import ApplicationConfig from '../../Config/Application';
import MapUserItem from '../../Components/MapUserItem';

MapboxGL.setAccessToken(ApplicationConfig.mapBoxAccessToken);

enum MapContainerStateActionKind {
  INIT_MAP = 'INIT_MAP',
  ON_CHANGE_USER_LOCATION = 'ON_CHANGE_USER_LOCATION',
  ON_CHANGE_RADIUS = 'ON_CHANGE_RADIUS',
}

interface MapContainerState {
  users: User[];
  radius: number;
  currentCoordinates?: number[];
  circleFeature?: turf.Feature<turf.Polygon, turf.Properties>;
}

interface MapContainerStateAction {
  type: MapContainerStateActionKind;
  payload: any;
}

const INITIAL_ZOOM_LEVEL: number = 16;

function reducer(state: MapContainerState, action: MapContainerStateAction) {
  const {type, payload} = action;
  switch (type) {
    case MapContainerStateActionKind.INIT_MAP: {
      const {users, circleFeature, currentCoordinates, radius} = payload;
      return {...state, users, circleFeature, currentCoordinates, radius};
    }
    case MapContainerStateActionKind.ON_CHANGE_USER_LOCATION: {
      const {currentCoordinates} = payload;
      return {...state, currentCoordinates};
    }
    case MapContainerStateActionKind.ON_CHANGE_RADIUS: {
      const {radius} = payload;
      return {...state, radius};
    }
    default:
      return state;
  }
}

const initialState: MapContainerState = {
  users: [],
  radius: ApplicationConfig.randomUserMinDistanceKm,
  currentCoordinates: undefined,
  circleFeature: undefined,
};

const MapContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const camera = useRef<MapboxGL.Camera>(null);

  const bootstrap = useCallback(
    (coordinates: number[], radius: number = state.radius) => {
      const users = getUsers(coordinates, radius);
      const circleFeature = turf.circle(coordinates, radius);

      dispatch({
        type: MapContainerStateActionKind.INIT_MAP,
        payload: {
          users,
          currentCoordinates: coordinates,
          circleFeature,
          radius,
        },
      });
    },
    [state.radius],
  );

  const onUserLocationUpdate = useCallback(
    (location: MapboxGL.Location) => {
      const coordinates: number[] = [
        location.coords.longitude,
        location.coords.latitude,
      ];
      bootstrap(coordinates);
    },
    [bootstrap],
  );

  const onPressUserItem = useCallback((user: User) => {
    navigationRef.current?.navigate('Chat', {user});
  }, []);

  const renderUserItem = useCallback(
    (user: User) => (
      <MapboxGL.MarkerView key={user.id} coordinate={user.coordinates}>
        <MapUserItem
          onPress={() => onPressUserItem(user)}
          title={`${Number(user.distanceFromMe).toFixed(1)} km`}
          user={user}
        />
      </MapboxGL.MarkerView>
    ),
    [onPressUserItem],
  );

  const onChangeRadiusValue = useCallback(
    (radius: number) => {
      bootstrap(state.currentCoordinates, radius);
    },
    [bootstrap, state.currentCoordinates],
  );

  return (
    <View style={MapContainerStyles.container}>
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Dark}
        style={MapContainerStyles.mapView}
        onUserLocationUpdate={onUserLocationUpdate}>
        {useMemo(
          () => (
            <MapboxGL.Camera
              ref={camera}
              zoomLevel={INITIAL_ZOOM_LEVEL}
              followUserLocation
              followUserMode={UserTrackingMode.Follow}
            />
          ),
          [],
        )}
        {useMemo(
          () => state.users.map(renderUserItem),
          [renderUserItem, state.users],
        )}
        {useMemo(
          () =>
            state.circleFeature && (
              <MapboxGL.ShapeSource
                id={'circle-feature'}
                shape={state.circleFeature}>
                <MapboxGL.LineLayer
                  sourceID="circle-feature"
                  id="circle-feature-line"
                  style={MapContainerStyles.circleLine}
                />
                <MapboxGL.FillLayer
                  sourceID="circle-feature"
                  id="circle-feature-fill"
                  style={MapContainerStyles.circleFill}
                />
              </MapboxGL.ShapeSource>
            ),
          [state.circleFeature],
        )}
        <MapboxGL.UserLocation visible onUpdate={onUserLocationUpdate} />
      </MapboxGL.MapView>
      {useMemo(
        () => (
          <Stepper
            label={(value: number) => `${value} km`}
            value={state.radius}
            onChangeValue={onChangeRadiusValue}
          />
        ),
        [onChangeRadiusValue, state.radius],
      )}
    </View>
  );
};

export default MapContainer;
