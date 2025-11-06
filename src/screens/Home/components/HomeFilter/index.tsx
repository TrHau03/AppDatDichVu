import React, { memo, useCallback, useReducer } from 'react';
import {
  Animated,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icons from '../../../../components/AppIcon';
import { colors } from '../../../../config/styles/color';
import { styles } from './styles';

enum ActionType {
  Now = 'now',
  Later = 'later',
}

interface InitialState {
  searchText: string;
  action: 'now' | 'later';
}
interface Action {
  type: string;
  payload?: any;
}

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.payload };
    case 'SET_ACTION':
      return { ...state, action: action.payload };
    default:
      return state;
  }
};
const initialState = {
  searchText: '',
  action: 'now',
};
const HomeFilter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nowScale = React.useRef(new Animated.Value(1)).current;
  const laterScale = React.useRef(new Animated.Value(1)).current;

  const onChangeText = (text: string) => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: text });
  };

  const handlePress = (type: ActionType) => {
    const scale = type === ActionType.Now ? nowScale : laterScale;

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    dispatch({ type: 'SET_ACTION', payload: type });
  };

  const clearSearch = useCallback(() => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: '' });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={state.searchText}
          onChangeText={onChangeText}
          style={styles.inputContainer}
          placeholder="Tìm kiếm dịch vụ..."
        />
        <Pressable onPress={clearSearch}>
          <Icons
            name="close"
            el="Ionicons"
            size="sm"
            isPaddingIcon={false}
            color={colors.gray4}
          />
        </Pressable>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePress(ActionType.Now)}
        >
          <Animated.View
            style={[
              styles.nowActionContainer,
              state.action === ActionType.Now &&
                styles.activeNowActionContainer,
              { transform: [{ scale: nowScale }] },
            ]}
          >
            <Icons
              name="flash"
              el="Ionicons"
              isPaddingIcon={false}
              color={
                state.action === ActionType.Now ? colors.primary : colors.black
              }
            />
            {state.action === ActionType.Now && (
              <Text style={[styles.actionText, styles.activeActionText]}>
                Làm ngay
              </Text>
            )}
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePress(ActionType.Later)}
        >
          <Animated.View
            style={[
              styles.nowActionContainer,
              state.action === ActionType.Later &&
                styles.activeNowActionContainer,
              { transform: [{ scale: laterScale }] },
            ]}
          >
            <Icons
              name="calendar-outline"
              el="Ionicons"
              isPaddingIcon={false}
              color={
                state.action === ActionType.Later
                  ? colors.primary
                  : colors.black
              }
            />
            {state.action === ActionType.Later && (
              <Text style={[styles.actionText, styles.activeActionText]}>
                Làm sau
              </Text>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(HomeFilter);
