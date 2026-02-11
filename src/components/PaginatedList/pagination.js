// 

// PaginatedFlatList.js

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors2 } from '../../theme/colors2';


const PaginatedFlatList = ({
  page,
  setPage,
  limit,
  data,
  isFetching,
  isLoading,
  refetch,
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  contentContainerStyle,
}) => {
  const [fullData, setFullData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (data?.docs?.length >= 0) {
      if (page === 1) {
        setFullData(data.docs);
      } else {
        setFullData(prev => [...prev, ...data.docs]);
      }

      if (data.docs.length < limit) {
        setHasMore(false);
      }
    }
  }, [data]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    setPage(1);
    setHasMore(true);
    setFullData([]);
    await refetch();
    setIsRefreshing(false);
  };

  const onEndReached = () => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const renderFooter = () =>
    isFetching && page > 1 ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color={colors2?.theme?.secondary} />
      </View>
    ) : null;

  if (isLoading && page === 1) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors2?.theme?.secondary} />
      </View>
    );
  }

  return (
    <FlatList
      data={fullData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={[colors2?.theme?.secondary]}
        />
      }
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PaginatedFlatList;
