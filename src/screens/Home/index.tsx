import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import Wrapper from '../../components/Wrapper';
import { HomeFilter, HomeHeader, ServiceItem } from './components';
import { Service } from './components/ServiceItem/type';

const Home = () => {
  const renderItem = useCallback(
    ({ item }: { item: Service }) => <ServiceItem service={item} />,
    [],
  );

  return (
    <Wrapper isSafeArea>
      <HomeHeader />
      <HomeFilter />
      <FlatList
        data={mockServices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Wrapper>
  );
};

export default Home;

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Cắt tóc nam',
    price: 150000,
    points: 4.5,
    provider: 'Salon ABC',
    distance: 1.2,
    type: 'Tại tiệm',
    imageUrl: ['url1', 'url2', 'url3', 'url4', 'url5'],
  },
  {
    id: '2',
    name: 'Nhuộm tóc nữ',
    price: 500000,
    points: 4.8,
    provider: 'Hair Studio XYZ',
    distance: 2.5,
    type: 'Tại tiệm',
    imageUrl: ['url1', 'url2', 'url3', 'url4', 'url5'],
  },
  {
    id: '3',
    name: 'Gội đầu massage',
    price: 80000,
    points: 4.2,
    provider: 'Spa Relax',
    distance: 0.8,
    type: 'Phục vụ tại nhà',
    imageUrl: ['url1', 'url2', 'url3', 'url4', 'url5'],
  },
  {
    id: '4',
    name: 'Uốn tóc',
    price: 350000,
    points: 4.6,
    provider: 'Beauty House',
    distance: 3.0,
    type: 'Tại tiệm',
    imageUrl: ['url1', 'url2', 'url3', 'url4', 'url5'],
  },
  {
    id: '5',
    name: 'Duỗi tóc',
    price: 400000,
    points: 4.7,
    provider: 'Hair Care Pro',
    distance: 1.5,
    type: 'Phục vụ tại nhà',
    imageUrl: ['url1', 'url2', 'url3', 'url4', 'url5'],
  },
];
