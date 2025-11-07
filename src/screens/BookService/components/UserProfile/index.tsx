import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icons from '../../../../components/AppIcon';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { UserActions } from '../../../../redux/features/user/userReducer';
import EditUserModal from '../EditUserModal';
import { styles } from './styles';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.root.user.profile);
  const timeForBooking = useAppSelector(
    state => state.root.user.dateForBooking,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(
    user?.addressDescription || '',
  );

  const handleSave = (name: string, phone: string) => {
    dispatch(UserActions.updateProfile({ name, phoneNumber: phone }));
  };

  const handleSaveDescription = () => {
    dispatch(UserActions.updateProfile({ addressDescription: description }));
    setIsEditingDescription(false);
  };

  const handleCancelDescription = () => {
    setDescription(user?.addressDescription || '');
    setIsEditingDescription(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Icons
          name="location-outline"
          size="md"
          el="Ionicons"
          isPaddingIcon={false}
        />
        <View style={styles.addressContent}>
          <Text>Thực hiện dịch vụ tại</Text>
          <Text style={styles.addressText}>{user?.address}</Text>
          {isEditingDescription ? (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <TextInput
                style={styles.descriptionInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Nhập mô tả"
                maxLength={100}
                autoFocus
              />
              <TouchableOpacity onPress={handleCancelDescription}>
                <Text style={styles.cancelButton}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveDescription}>
                <Text style={styles.saveButton}>Lưu</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setIsEditingDescription(true)}>
              <Text style={styles.addressDescription}>
                {user.addressDescription || 'Thêm mô tả'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Icons name="chevron-forward-outline" size="md" el="Ionicons" />
      </View>
      <View style={styles.contentContainer}>
        <Icons
          name="call-outline"
          size="md"
          el="Ionicons"
          isPaddingIcon={false}
        />
        <Text style={styles.userPhone}>
          {user?.phoneNumber} - {user?.name}
        </Text>
        <Icons
          name="edit"
          size="md"
          el="AntDesign"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.contentContainer}>
        <Icons name="clock" size="md" el="Entypo" isPaddingIcon={false} />
        <Text style={styles.typeText}>
          Hình thức: {timeForBooking === 'now' ? 'Làm ngay' : 'Làm sau'}
        </Text>
      </View>

      <EditUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialName={user?.name || ''}
        initialPhone={user?.phoneNumber || ''}
      />
    </View>
  );
};

export default UserProfile;
