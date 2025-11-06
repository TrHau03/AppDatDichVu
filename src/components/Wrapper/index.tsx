import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {
  Edges,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { colors } from '../../config/styles/color';
import { padding } from '../../config/styles/spacing';
import {
  RootStackEnum,
  StackNavigationProps,
} from '../../navigation/stack/type';
import Icons from '../AppIcon';
interface Props {
  children: React.ReactNode;
  edges?: Edges;
  isSafeArea?: boolean;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const Wrapper: React.FC<Props> = ({
  children,
  edges = ['bottom', 'top'],
  isSafeArea,
  containerStyle,
  isLoading,
}) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProps>();
  if (isLoading) {
    return (
      <View
        style={[
          { flex: 1, justifyContent: 'center', alignItems: 'center' },
          containerStyle,
        ]}
      >
        <Pressable
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate(RootStackEnum.Home)
          }
          style={{ position: 'absolute', top: top, left: padding.md }}
        >
          <Icons
            name="chevron-back"
            size="md"
            color={colors.black}
            el="Ionicons"
            isPaddingIcon={false}
          />
        </Pressable>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  if (!isSafeArea) {
    return <View style={[{ flex: 1 }, containerStyle]}>{children}</View>;
  }
  return (
    <SafeAreaView edges={edges} style={[{ flex: 1 }, containerStyle]}>
      {children}
    </SafeAreaView>
  );
};

export default Wrapper;
