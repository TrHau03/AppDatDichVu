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
  [RootStackEnum.BookService]: {
    serviceId: string;
    moreServicesTotal?: number;
  };
  [RootStackEnum.PaymentMethod]: undefined;
};

export type StackNavigationProps = StackNavigationProp<RootStackParamList>;
