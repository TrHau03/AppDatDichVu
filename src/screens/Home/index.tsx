import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import Wrapper from '../../components/Wrapper';
import { padding } from '../../config/styles/spacing';
import { mockServices } from '../../helper/data';
import { HomeFilter, HomeHeader, ServiceItem } from './components';
import { Service } from './components/ServiceItem/type';
import { styles } from './styles';

const Home = () => {
  const [data, setData] = useState(mockServices);
  const keyExtractor = useCallback((item: Service) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Service }) => <ServiceItem service={item} />,
    [],
  );

  const refreshControl = useMemo(() => {
    return <RefreshControl refreshing={false} onRefresh={() => {}} />;
  }, []);

  const handleActionChange = (action: 'now' | 'later') => {};

  const handleSearch = (text: string) => {
    setData(
      mockServices.filter(service =>
        service.name.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <Wrapper isSafeArea containerStyle={styles.container}>
      <HomeHeader />
      <HomeFilter onSearch={handleSearch} onActionChange={handleActionChange} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={refreshControl}
        contentContainerStyle={{ gap: padding.md, paddingBottom: padding.md }}
      />
    </Wrapper>
  );
};

export default Home;
