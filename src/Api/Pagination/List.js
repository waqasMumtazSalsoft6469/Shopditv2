import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useMemo,
} from 'react';
import {Alert, FlatList, RefreshControl, View} from 'react-native';
import {usePagination} from './hook';
import ActivityLoader from '../../components/ActivityLoader';
import {colors2} from '../../theme/colors2';
import EmptyDataComponent from '../../components/EmptyDataComponent';
import {LOG} from '../../utils/helperFunction';
import {WIDTH} from '../../theme/units';

const PaginatedList = forwardRef((props, ref) => {
  const {
    contentContainerStyle,
    fetchData,
    renderItem,
    scrollEnabled,
    id,
    payload = {},
    ListHeaderComponent,
    ListFooterComponent,
    numColumns = 1,
    resetKey,
    preferredKey = 'preferredEvents',
    fallbackKey = 'fallbackEvents',
    searchText = '',
    searchFields = [],
  } = props;

  const {data, isLoading, isFetching, loadMore, refresh, isRefresh, refetch} =
    usePagination(
      fetchData,
      {...payload},
      id,
      resetKey,
      preferredKey,
      fallbackKey,
    );

  const [isDataReady, setIsDataReady] = useState(false);

  // Track when the initial fetch is complete
  useEffect(() => {
    if (!isLoading && !isFetching) {
      setIsDataReady(true);
    }
  }, [isLoading, isFetching]);

  console.log('payuloadddd,asndfkjlsfhsjkf', payload);
  // LOG('payload----', payload);
  // LOG('data?.docs', data?.docs);
  // LOG('isFetching', isFetching);
  // LOG('isLoading', isLoading);
  // LOG('isDataReady', isDataReady);

  const filteredData = useMemo(() => {
    const docs = data?.docs || [];
    if (!searchText || searchFields.length === 0) {
      return docs;
    }
    const lowerSearch = searchText.toLowerCase();
    return docs.filter(item =>
      searchFields.some(field =>
        item[field]?.toString().toLowerCase().includes(lowerSearch),
      ),
    );
  }, [data?.docs, searchText, searchFields]);

  useImperativeHandle(ref, () => ({
    refetch,
    data,
  }));

  if (isLoading) {
    return (
      <>
        <ActivityLoader style={{alignSelf: 'center'}} />
        <EmptyDataComponent message={'Loading! Please Wait.'} />
      </>
    );
  }
  return (
    <>
      {ListHeaderComponent && ListHeaderComponent()}
      <FlatList
        keyExtractor={props.keyExtractor || (item => item._id.toString())}
        contentContainerStyle={contentContainerStyle}
        data={filteredData} // Use filtered data
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={refresh} />
        }
        onEndReached={() => {
          if (data?.hasNextPage && !isFetching) {
            LOG('Triggering loadMore for page:', data?.page );
            loadMore();
            // Alert.alert('jhhjjh')
          }
        }}
        onEndReachedThreshold={0.8}
        ListEmptyComponent={() =>
          isDataReady && !isFetching && filteredData.length === 0 ? (
            <EmptyDataComponent
              message={
                (data?.docs || []).length === 0
                  ? 'No Data Available.'
                  : 'No matching results.'
              }
            />
          ) : null
        }
        ListFooterComponent={() =>
          isFetching ? (
            <View style={{width: WIDTH, alignItems: 'center'}}>
              <ActivityLoader
                color={colors2.theme.secondary}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  alignSelf: 'center',
                  padding: 4,
                  backgroundColor: colors2.theme.white,
                  elevation: 4,
                  marginVertical: 2,
                }}
                size="small"
              />
            </View>
          ) : ListFooterComponent ? (
            ListFooterComponent()
          ) : null
        }
      />
    </>
  );
});

export default PaginatedList;
