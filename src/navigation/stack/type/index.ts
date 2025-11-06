import { StackNavigationProp } from '@react-navigation/stack';

export enum RootStackEnum {
  Home = 'Home',
  ServiceDetail = 'ServiceDetail',
  BookService = 'BookService',
  PaymentMethod = 'PaymentMethod',
}
export type RootStackParamList = {
  [RootStackEnum.Home]: undefined;
  [RootStackEnum.ServiceDetail]: { serviceId: string };
  [RootStackEnum.BookService]: { serviceId: string; date: string };
  [RootStackEnum.PaymentMethod]: { bookingId: string };
};

export type StackNavigationProps = StackNavigationProp<RootStackParamList>;
