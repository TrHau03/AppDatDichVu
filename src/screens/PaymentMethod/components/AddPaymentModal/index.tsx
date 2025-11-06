import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type AddPaymentModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (paymentData: { type: 'bank' | 'wallet'; cardNumber: string }) => void;
};

const AddPaymentModal = ({ visible, onClose, onAdd }: AddPaymentModalProps) => {
  const [selectedType, setSelectedType] = useState<'bank' | 'wallet'>('bank');
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');

  // Format số thẻ ngân hàng: 1234 5678 9012 3456
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  // Format số điện thoại
  const formatPhoneNumber = (text: string) => {
    return text.replace(/[^0-9]/g, '');
  };

  const handleCardNumberChange = (text: string) => {
    setError('');

    if (selectedType === 'bank') {
      // Chỉ cho phép số
      const cleaned = text.replace(/[^0-9]/g, '');
      // Giới hạn 16 số
      const limited = cleaned.slice(0, 16);
      // Format với khoảng trống
      const formatted = formatCardNumber(limited);
      setCardNumber(formatted);
    } else {
      // Ví MoMo: chỉ số, tối đa 10 ký tự
      const formatted = formatPhoneNumber(text).slice(0, 10);
      setCardNumber(formatted);
    }
  };

  const validateInput = () => {
    if (!cardNumber.trim()) {
      setError(
        selectedType === 'bank'
          ? 'Vui lòng nhập số thẻ'
          : 'Vui lòng nhập số điện thoại',
      );
      return false;
    }

    if (selectedType === 'bank') {
      const cleanedCard = cardNumber.replace(/\s/g, '');
      if (cleanedCard.length < 16) {
        setError('Số thẻ phải có đủ 16 số');
        return false;
      }
    } else {
      if (cardNumber.length !== 10) {
        setError('Số điện thoại phải có đủ 10 số');
        return false;
      }
      if (!cardNumber.startsWith('0')) {
        setError('Số điện thoại phải bắt đầu bằng số 0');
        return false;
      }
    }

    return true;
  };

  const handleAdd = () => {
    if (validateInput()) {
      onAdd({
        type: selectedType,
        cardNumber:
          selectedType === 'bank' ? cardNumber.replace(/\s/g, '') : cardNumber,
      });
      setCardNumber('');
      setError('');
      onClose();
    }
  };

  const handleClose = () => {
    setCardNumber('');
    setError('');
    onClose();
  };

  const handleTypeChange = (type: 'bank' | 'wallet') => {
    setSelectedType(type);
    setCardNumber('');
    setError('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Thêm phương thức thanh toán</Text>

          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === 'bank' && styles.typeButtonActive,
              ]}
              onPress={() => handleTypeChange('bank')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  selectedType === 'bank' && styles.typeButtonTextActive,
                ]}
              >
                Thẻ ngân hàng
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === 'wallet' && styles.typeButtonActive,
              ]}
              onPress={() => handleTypeChange('wallet')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  selectedType === 'wallet' && styles.typeButtonTextActive,
                ]}
              >
                Ví MoMo
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {selectedType === 'bank' ? 'Số thẻ' : 'Số điện thoại MoMo'}
            </Text>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              placeholder={
                selectedType === 'bank'
                  ? 'Nhập số thẻ ngân hàng'
                  : 'Nhập số điện thoại MoMo'
              }
              keyboardType="numeric"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAdd}
            >
              <Text style={styles.addButtonText}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPaymentModal;
