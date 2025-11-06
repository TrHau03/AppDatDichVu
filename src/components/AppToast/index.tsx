import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { borderRadius } from '../../config/styles/borderRadius';
import { colors } from '../../config/styles/color';
import { padding } from '../../config/styles/spacing';
import { ToastRef } from '../../utils/globalRefs';
import { normalize } from '../../utils/normalize';

export interface TimedModalHandle {
  show: ({
    title,
    description,
    value,
    durationOR,
    onPress,
  }: {
    title: string;
    description: string;
    value?: string;
    durationOR?: number;
    onPress?: () => void;
  }) => void;
}

export type TimedModalProps = {
  duration?: number;
};

type ToastPayload = {
  title: string;
  description: string;
  value?: string;
  durationOR?: number;
  onPress?: () => void;
};

type ToastInternalState = {
  id: number;
  visible: boolean;
  payload: ToastPayload | null;
};

const DEFAULT_DURATION = 3000;

let defaultDuration = DEFAULT_DURATION;
let toastIdCounter = 0;
let toastState: ToastInternalState = {
  id: 0,
  visible: false,
  payload: null,
};
const listeners = new Set<(state: ToastInternalState) => void>();
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const emit = () => {
  listeners.forEach(listener => listener(toastState));
};

const getState = () => toastState;

const scheduleHide = (id: number, duration: number) => {
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    hide(id);
  }, duration);
};

const show = ({
  title,
  description,
  value,
  durationOR,
  onPress,
}: ToastPayload) => {
  toastIdCounter += 1;
  const toastDuration = durationOR ?? defaultDuration;
  toastState = {
    id: toastIdCounter,
    visible: true,
    payload: {
      title,
      description,
      value: value ?? undefined,
      durationOR: toastDuration,
      onPress: onPress ?? (() => {}),
    },
  };
  emit();
  scheduleHide(toastState.id, toastDuration);
};

const hide = (id?: number) => {
  if (!toastState.visible) return;
  if (typeof id === 'number' && toastState.id !== id) return;
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
  toastState = {
    ...toastState,
    visible: false,
  };
  emit();
};

const subscribe = (listener: (state: ToastInternalState) => void) => {
  listeners.add(listener);
  listener(toastState);
  return () => {
    listeners.delete(listener);
  };
};

const setDefaultDuration = (duration: number) => {
  defaultDuration = duration;
};

const toastHandle: TimedModalHandle = {
  show,
};

if (!ToastRef.current) {
  ToastRef.current = toastHandle;
}

const useToastState = () => {
  const [state, setState] = useState<ToastInternalState>(() => getState());

  useEffect(() => {
    const unsubscribe = subscribe(setState);
    return () => unsubscribe();
  }, []);

  return state;
};

type ToastRendererProps = {
  containerStyle?: StyleProp<ViewStyle>;
};

const ToastRenderer = ({ containerStyle }: ToastRendererProps) => {
  const toastState = useToastState();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const latestState = useRef<ToastInternalState>(toastState);
  const [shouldRender, setShouldRender] = useState(() => toastState.visible);

  useEffect(() => {
    latestState.current = toastState;
  }, [toastState]);

  useEffect(() => {
    if (toastState.visible && toastState.payload) {
      setShouldRender(true);
      panY.setValue(0);
      fadeAnim.stopAnimation(() => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      fadeAnim.stopAnimation();
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const state = latestState.current;
          if (!state.visible) {
            panY.setValue(0);
            setShouldRender(false);
          }
        }
      });
    }
  }, [fadeAnim, panY, toastState.payload, toastState.visible]);

  const payload = toastState.payload;

  const handlePress = () => {
    if (!payload) return;
    payload.onPress?.();
    hide(toastState.id);
  };

  const fadeTranslateY = useMemo(
    () =>
      fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
      }),
    [fadeAnim],
  );

  const containerAnimatedStyle = useMemo(
    () => ({
      opacity: fadeAnim,
      transform: [
        {
          translateY: fadeTranslateY,
        },
        {
          translateY: panY,
        },
      ],
    }),
    [fadeAnim, fadeTranslateY, panY],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          if (!latestState.current.visible) return false;
          const isVertical =
            Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
          const isSwipeUp = gestureState.dy < -5;
          return isVertical && isSwipeUp;
        },
        onPanResponderMove: (_, gestureState) => {
          panY.setValue(Math.min(0, gestureState.dy));
        },
        onPanResponderRelease: (_, gestureState) => {
          panY.stopAnimation();
          const dismissId = latestState.current.id;
          if (gestureState.dy < -40) {
            Animated.timing(panY, {
              toValue: -80,
              duration: 150,
              useNativeDriver: true,
            }).start(({ finished }) => {
              if (finished) {
                hide(dismissId);
              }
            });
            return;
          }
          Animated.timing(panY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
        },
        onPanResponderTerminate: () => {
          panY.stopAnimation();
          Animated.timing(panY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
        },
      }),
    [panY],
  );

  if (!shouldRender || !payload) return null;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.hostContainer, containerStyle]}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.container, containerAnimatedStyle]}
      >
        <Pressable
          onPress={handlePress}
          style={{
            flexDirection: 'row',
            gap: padding.md,
            paddingHorizontal: padding.sm,
            paddingVertical: padding.sm,
          }}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{payload.title}</Text>
            <Text style={styles.description} numberOfLines={4}>
              {payload.description +
                (payload.value ? `: ${payload.value}` : '')}
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const AppToast = ({ duration = DEFAULT_DURATION }: TimedModalProps) => {
  useEffect(() => {
    setDefaultDuration(duration);
  }, [duration]);

  return <ToastRenderer />;
};

export const AppToastPortal = ({ containerStyle }: ToastRendererProps) => {
  return <ToastRenderer containerStyle={containerStyle} />;
};

export default AppToast;

const styles = StyleSheet.create({
  hostContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  container: {
    position: 'absolute',
    top: Platform.OS === 'android' ? normalize(50) : normalize(60),
    left: '5%',
    right: '5%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    paddingHorizontal: padding.sm,
  },
  title: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  description: {
    fontSize: normalize(14),
    textAlign: 'left',
  },
});
