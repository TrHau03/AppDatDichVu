import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { createRef } from 'react';
import { TimedModalHandle } from '../components/AppToast';

export const ToastRef = createRef<TimedModalHandle>();
export const NavigationRef =
  createRef<NavigationContainerRefWithCurrent<any>>();
export const RouteNameRef = createRef();
