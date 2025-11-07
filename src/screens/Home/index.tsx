import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';
import Wrapper from '../../components/Wrapper';
import { colors } from '../../config/styles/color';
import { padding } from '../../config/styles/spacing';
import { mockServices } from '../../helper/data';
import HomeFilter from './components/HomeFilter';
import HomeHeader from './components/HomeHeader';
import ServiceItem from './components/ServiceItem';
import { Service } from './components/ServiceItem/type';
import ServiceItemSkeleton from './components/ServiceItemSkeleton';
import { styles } from './styles';

const PER_PAGE = 5;

const Home = () => {
  const [data, setData] = useState<Service[]>([]);
  const [filteredData, setFilteredData] = useState(mockServices);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState('');

  // Load initial data
  React.useEffect(() => {
    loadData(1, true);
  }, []);

  const loadData = useCallback(
    (pageNum: number, isInitial = false) => {
      if (isInitial) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      // Simulate API call
      setTimeout(() => {
        const start = (pageNum - 1) * PER_PAGE;
        const end = start + PER_PAGE;
        const newData = filteredData.slice(start, end);

        if (isInitial) {
          setData(newData);
          setIsLoading(false);
        } else {
          setData(prev => [...prev, ...newData]);
          setIsLoadingMore(false);
        }

        setHasMore(end < filteredData.length);
        setPage(pageNum);
      }, 1000);
    },
    [filteredData],
  );

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      loadData(page + 1);
    }
  }, [isLoadingMore, hasMore, page, loadData]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    loadData(1, true);
  }, [loadData]);

  const keyExtractor = useCallback((item: Service) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Service }) => <ServiceItem service={item} />,
    [],
  );

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <View style={{ paddingVertical: padding.md }}>
        <ActivityIndicator size="small" color={colors.blue} />
      </View>
    );
  }, [isLoadingMore]);

  const refreshControl = useMemo(() => {
    return <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />;
  }, [isLoading, handleRefresh]);

  const handleActionChange = (action: 'now' | 'later') => {};

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = mockServices.filter(service =>
      service.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
    setPage(1);
    loadData(1, true);
  };

  //Simulate loading state
  if (isLoading) {
    return (
      <Wrapper isSafeArea containerStyle={styles.container}>
        <HomeHeader />
        <HomeFilter
          onSearch={handleSearch}
          onActionChange={handleActionChange}
        />
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => <ServiceItemSkeleton />}
          keyExtractor={(_, index) => `skeleton-${index}`}
          contentContainerStyle={{ gap: padding.md, paddingBottom: padding.md }}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper isSafeArea containerStyle={styles.container}>
      <HomeHeader />
      <HomeFilter onSearch={handleSearch} onActionChange={handleActionChange} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={refreshControl}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ gap: padding.md, paddingBottom: padding.md }}
      />
    </Wrapper>
  );
};

export default Home;
