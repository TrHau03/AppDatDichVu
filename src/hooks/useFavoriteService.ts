import { useCallback } from 'react';
import { ServiceActions } from '../redux/features/services/servicesReducer';
import { ToastRef } from '../utils/globalRefs';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useFavoriteService = (serviceId: string) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state =>
    state.root.services.favorites.includes(serviceId),
  );
  const handleFavoriteToggle = useCallback(() => {
    dispatch(
      isFavorite
        ? ServiceActions.removeFavorite(serviceId)
        : ServiceActions.addFavorite(serviceId),
    );
    ToastRef.current?.show({
      title: 'Thông báo',
      description: isFavorite
        ? 'Đã xóa khỏi yêu thích'
        : 'Đã thêm vào yêu thích',
    });
  }, [dispatch, serviceId, isFavorite, ToastRef]);

  return { isFavorite, handleFavoriteToggle };
};
