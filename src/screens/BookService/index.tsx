import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Icons from '../../components/AppIcon';
import Footer from '../../components/Footer';
import Wrapper from '../../components/Wrapper';
import { mockServiceDetails } from '../../helper/data';
import { RootStackEnum, RootStackParamList } from '../../navigation/stack/type';
import { ToastRef } from '../../utils/globalRefs';
import JobInfo from './components/JobInfo';
import PaymentDetail from './components/PaymentDetail';
import UserProfile from './components/UserProfile';
import { styles } from './styles';
const BookService = () => {
  const { serviceId, moreServicesTotal } =
    useRoute<RouteProp<RootStackParamList, RootStackEnum.BookService>>().params;
  const [service, setService] = useState(() => {
    return mockServiceDetails.find(item => item.id === serviceId) || null;
  });

  const totalAmount = (service?.price || 0) + (moreServicesTotal || 0);

  const handleCreateRequest = useCallback(() => {
    ToastRef.current?.show({
      title: 'Thông báo',
      description: 'Tạo yêu cầu thành công',
    });
  }, []);

  return (
    <Wrapper isSafeArea={false}>
      <AppHeader
        title="Xác nhận yêu cầu "
        rightComponent={
          <Icons
            name="help-outline"
            el="Ionicons"
            isPaddingIcon={true}
            containerStyle={styles.iconRightComponent}
          />
        }
      />
      <ScrollView contentContainerStyle={styles.container}>
        <UserProfile />
        <JobInfo
          price={service?.price || 0}
          morePrice={moreServicesTotal || 0}
          provider={service?.provider || ''}
        />
        <PaymentDetail totalAmount={totalAmount} />
      </ScrollView>
      <Footer
        type="request"
        price={totalAmount}
        onPress={handleCreateRequest}
      />
    </Wrapper>
  );
};

export default BookService;
