import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, phone: string) => void;
  initialName: string;
  initialPhone: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  onClose,
  onSave,
  initialName,
  initialPhone,
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError('Vui lòng nhập họ và tên');
      return false;
    }
    if (value.trim().length < 2) {
      setNameError('Họ và tên phải có ít nhất 2 ký tự');
      return false;
    }
    setNameError('');
    return true;
  };

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!value.trim()) {
      setPhoneError('Vui lòng nhập số điện thoại');
      return false;
    }
    if (!phoneRegex.test(value.trim())) {
      setPhoneError('Số điện thoại không hợp lệ');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSave = () => {
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);

    if (isNameValid && isPhoneValid) {
      onSave(name.trim(), phone.trim());
      onClose();
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (nameError) {
      validateName(value);
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (phoneError) {
      validatePhone(value);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Chỉnh sửa thông tin</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput
              style={[styles.input, nameError ? styles.inputError : null]}
              value={name}
              onChangeText={handleNameChange}
              placeholder="Nhập họ và tên"
              maxLength={100}
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={[styles.input, phoneError ? styles.inputError : null]}
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              maxLength={12}
            />
            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditUserModal;
