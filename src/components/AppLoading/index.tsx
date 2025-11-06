import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { StatusBarBackgroundColorEnum } from '../../config/statusBar';
import { colors } from '../../config/styles/color';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { AppActions } from '../../redux/features/app/appReducer';

const AppLoading = () => {
  const isLoading = useAppSelector(state => state.root.app.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isLoading && dispatch(AppActions.hideLoading());
  }, [dispatch]);
  return (
    <Modal visible={isLoading} transparent={true}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={StatusBarBackgroundColorEnum.transparent}
      />
      <View style={styles.containerOverlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  containerOverlay: {
    flex: 1,
    backgroundColor: `#00000060`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'transparent',
  },
});
