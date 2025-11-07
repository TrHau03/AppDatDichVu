import React, { memo, useCallback, useReducer, useState } from 'react';
import {
  Animated,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icons from '../../../../components/AppIcon';
import { colors } from '../../../../config/styles/color';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useAppDispatch } from '../../../../hooks/useRedux';
import { UserActions } from '../../../../redux/features/user/userReducer';
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
  type: 'SET_SEARCH_TEXT' | 'SET_ACTION';
  payload?: any;
}

interface HomeFilterProps {
  onSearch: (text: string) => void;
  onActionChange: (action: 'now' | 'later') => void;
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

const HomeFilter = ({ onSearch, onActionChange }: HomeFilterProps) => {
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const dispatch = useAppDispatch();
  const [datePicker, setDatePicker] = useState<Date>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const nowScale = React.useRef(new Animated.Value(1)).current;
  const laterScale = React.useRef(new Animated.Value(1)).current;
  const debounce = useDebounce(state.searchText, 500);

  React.useEffect(() => {
    onSearch(debounce);
  }, [debounce]);

  const onChangeText = (text: string) => {
    dispatchReducer({ type: 'SET_SEARCH_TEXT', payload: text });
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
    dispatchReducer({ type: 'SET_ACTION', payload: type });
    if (type === ActionType.Now) {
      dispatch(UserActions.updateDateForBooking(ActionType.Now));
    } else {
      setOpenDatePicker(true);
    }
  };

  const handleConfirmDate = useCallback((selectedDate: Date) => {
    setDatePicker(selectedDate);
    setOpenDatePicker(false);
    dispatch(UserActions.updateDateForBooking(selectedDate));
  }, []);

  const clearSearch = useCallback(() => {
    dispatchReducer({ type: 'SET_SEARCH_TEXT', payload: '' });
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
        {state.searchText.length > 0 && (
          <Pressable onPress={clearSearch}>
            <Icons
              name="close"
              el="Ionicons"
              size="sm"
              isPaddingIcon={false}
              color={colors.gray4}
            />
          </Pressable>
        )}
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
              size="sm"
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
              size="sm"
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
      <DatePicker
        modal
        open={openDatePicker}
        date={datePicker}
        mode="datetime"
        minimumDate={new Date()}
        onConfirm={handleConfirmDate}
        onCancel={() => {
          setOpenDatePicker(false);
          handlePress(ActionType.Now);
        }}
        locale="vi"
        title="Chọn ngày và giờ"
        confirmText="Xác nhận"
        cancelText="Hủy"
      />
    </View>
  );
};

export default memo(HomeFilter);
