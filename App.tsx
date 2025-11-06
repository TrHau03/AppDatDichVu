import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppLoading from './src/components/AppLoading';
import AppToast from './src/components/AppToast';
import ErrorBoundary from './src/components/ErrorBoundary';
import StackNavigation from './src/navigation/stack';
import { persiststor, store } from './src/redux/store';
import { NavigationRef, RouteNameRef } from './src/utils/globalRefs';

enableFreeze(true);

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={NavigationRef}
          onReady={() => {
            RouteNameRef.current =
              NavigationRef?.current?.getCurrentRoute()?.name;
          }}
          onStateChange={async () => {
            const previousRouteName = RouteNameRef.current;
            const currentRouteName =
              NavigationRef.current?.getCurrentRoute()?.name;

            if (previousRouteName !== currentRouteName && currentRouteName) {
            }
            RouteNameRef.current = currentRouteName;
          }}
        >
          <ErrorBoundary>
            <PersistGate loading={null} persistor={persiststor}>
              <StackNavigation />
              <AppLoading />
              <AppToast duration={2000} />
            </PersistGate>
          </ErrorBoundary>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
