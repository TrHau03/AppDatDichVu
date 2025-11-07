import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AppHeader from '../../components/AppHeader';
import Icons from '../../components/AppIcon';
import Wrapper from '../../components/Wrapper';
import { useAppSelector } from '../../hooks/useRedux';
import { UserActions } from '../../redux/features/user/userReducer';
import { ToastRef } from '../../utils/globalRefs';
import AddPaymentModal from './components/AddPaymentModal';
import { styles } from './styles';

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { cards, current } = useAppSelector(state => state.root.user.payment);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectCard = useCallback(
    (card: { id: string; cardNumber: string | null }) => {
      dispatch(UserActions.setCurrentPayment(card));
      navigation.canGoBack() && navigation.goBack();
    },
    [],
  );

  const handleAddPayment = (paymentData: {
    type: 'bank' | 'wallet';
    cardNumber: string;
  }) => {
    const newCard = {
      id: Date.now().toString(),
      type: paymentData.type,
      cardNumber: paymentData.cardNumber,
    };
    dispatch(UserActions.addCard(newCard));
    ToastRef.current?.show({
      title: 'Thông báo',
      description: 'Thêm phương thức thanh toán thành công',
    });
  };

  const handleRemovePayment = (id: string) => {
    dispatch(
      UserActions.removeCard({
        id,
      }),
    );
    ToastRef.current?.show({
      title: 'Thông báo',
      description: 'Xoá phương thức thanh toán thành công',
    });
  };

  const maskCardNumber = (cardNumber: string, type: 'bank' | 'wallet') => {
    if (type === 'bank') {
      // Format thẻ: **** **** **** 1234
      const lastFourDigits = cardNumber.slice(-4);
      return `**** **** **** ${lastFourDigits}`;
    } else {
      const lastFourDigits = cardNumber.slice(6);

      return `** **** ${lastFourDigits}`;
    }
  };

  return (
    <Wrapper isSafeArea>
      <AppHeader title="Phương thức thanh toán" isSafeArea />

      <View style={styles.container}>
        {cards.map(card => (
          <TouchableOpacity
            key={card.id}
            style={styles.cardItem}
            onPress={() => handleSelectCard(card)}
            activeOpacity={0.7}
          >
            <View style={styles.checkbox}>
              {current.id === card.id && <View style={styles.checkboxInner} />}
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardLabel}>
                {card.type === 'cash' && 'Tiền mặt'}
                {card.type === 'bank' && 'Thẻ'}
                {card.type === 'wallet' && 'Ví MoMo'}
              </Text>
              {card.cardNumber && (
                <Text style={styles.cardNumber}>
                  {maskCardNumber(card.cardNumber, card.type as any)}
                </Text>
              )}
            </View>
            {card.type !== 'cash' && (
              <Icons
                name="close"
                el="Ionicons"
                containerStyle={styles.removeIcon}
                onPress={() => handleRemovePayment(card.id)}
              />
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>
            + Thêm phương thức thanh toán
          </Text>
        </TouchableOpacity>
      </View>

      <AddPaymentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddPayment}
      />
    </Wrapper>
  );
};
export default PaymentMethod;
