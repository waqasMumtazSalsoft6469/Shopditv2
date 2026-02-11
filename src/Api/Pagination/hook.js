import { useEffect, useState, useMemo } from 'react';
import { LOG } from '../../utils/helperFunction';
import { showToast } from '../../utils/toast';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

export const usePagination = (
  fetchData,
  config = {},
  id,
  resetKey,
  preferredKey,
  fallbackKey,
) => {
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: config.limit || 2,
    // limit: 3,
    ...config,
  });
  LOG('pageParamsdklhsadhk', pageParams);
  const [allDocs, setAllDocs] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const token = useSelector(state => state?.auth?.token);

  // Memoize config to prevent unnecessary resets
  const stableConfig = useMemo(
    () => ({ limit: config.limit || 2, ...config }),
    [config.limit, ...Object.values(config)],
  );
  // Fetch data using RTK Query
  const { data, isLoading, isFetching, refetch, error } = fetchData(pageParams, {
    refetchOnMountOrArgChange: true,
  });

  LOG('datadatadatadata', data);

  LOG('pageParams', pageParams);
  LOG('isFetchingisFetchingisFetching', isFetching);

  // LOG('allDocs', allDocs);
  // LOG('error', error);

  // Process data based on response structure
  useEffect(() => {
    if (data) {
      let newDocs = [];
      let paginationData = {};

      if (data?.docs) {
        // Handle standard data?.docs format
        newDocs = data.docs;
        paginationData = {
          totalDocs: data.totalDocs,
          limit: data.limit,
          page: data.page,
          totalPages: data.totalPages,
          hasPrevPage: data.hasPrevPage,
          hasNextPage: data.hasNextPage,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
        };
      } else if (data?.data?.notifications?.docs) {
        // Handle standard data?.docs format
        newDocs = data?.data?.notifications?.docs;
        paginationData = {
          totalDocs: data?.data?.notifications.totalDocs,
          limit: data?.data?.notifications.limit,
          page: data?.data?.notifications.page,
          totalPages: data?.data?.notifications.totalPages,
          hasPrevPage: data?.data?.notifications.hasPrevPage,
          hasNextPage: data?.data?.notifications.hasNextPage,
          prevPage: data?.data?.notifications.prevPage,
          nextPage: data?.data?.notifications.nextPage,
        };
      } else if (data?.[preferredKey]?.docs || data?.[fallbackKey]?.docs) {
        // Handle nested preferred/fallback format
        const preferredDocs = data?.[preferredKey]?.docs || [];
        const fallbackDocs = data?.[fallbackKey]?.docs || [];
        newDocs = [...preferredDocs, ...fallbackDocs]; // Preferred first, then fallback
        // console.log('preferredDocs', preferredDocs);
        // console.log('fallbackDocs', fallbackDocs);
        if (preferredDocs?.length === 0 && token) {
          showToast('Could not find any data according to your preferences.');
        }
        const preferredPagination = data?.[preferredKey] || {};
        const fallbackPagination = data?.[fallbackKey] || {};
        paginationData = {
          totalDocs:
            (preferredPagination.totalDocs || 0) +
            (fallbackPagination.totalDocs || 0),
          limit:
            preferredPagination.limit ||
            fallbackPagination.limit ||
            config.limit ||
            2,
          page: Math.max(
            preferredPagination.page || 1,
            fallbackPagination.page || 1,
          ),
          totalPages: Math.max(
            preferredPagination.totalPages || 1,
            fallbackPagination.totalPages || 1,
          ),
          hasPrevPage:
            preferredPagination.hasPrevPage ||
            fallbackPagination.hasPrevPage ||
            false,
          hasNextPage:
            preferredPagination.hasNextPage ||
            fallbackPagination.hasNextPage ||
            false,
          prevPage:
            preferredPagination.prevPage || fallbackPagination.prevPage || null,
          nextPage:
            preferredPagination.nextPage || fallbackPagination.nextPage || null,
        };
      }

      // setAllDocs(prev => {
      //   if (pageParams.page === 1) {
      //     // Reset on page 1 (initial load or refresh)
      //     return [...newDocs];
      //   }
      //   // Append new docs, ensuring no duplicates based on _id
      //   const existingIds = new Set(prev.map(item => item._id));
      //   const uniqueDocs = newDocs.filter(item => !existingIds.has(item._id));
      //   return [...prev, ...uniqueDocs];
      // });

      // // Update pagination data
      // setPageParams(prev => ({
      //   ...prev,
      //   ...paginationData,
      // }));

      // inside useEffect in usePagination
      setAllDocs(prev => {
        if (pageParams.page === 1) {
          return [...newDocs];
        }
        const existingIds = new Set(prev.map(item => item._id));
        const uniqueDocs = newDocs.filter(item => !existingIds.has(item._id));
        return [...prev, ...uniqueDocs];
      });

      // keep page from local state, only update metadata
      setPageParams(prev => ({
        ...prev,
        ...paginationData,
        page: prev.page,
      }));
    }
  }, [data, preferredKey, fallbackKey]); // Removed pageParams.page from deps

  // Load more data
  const loadMore = () => {
    // Alert.alert('heyy')
    console.log('heyyyyy', pageParams?.hasNextPage);
    // if (!isFetching && pageParams?.hasNextPage) {
    LOG('Loading more, next page:', pageParams.page);
    setPageParams(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
    // }
  };

  // Refresh data
  const refresh = () => {
    setPageParams(prev => ({
      ...prev,
      page: 1,
    }));
    setIsRefresh(true);
    refetch();
  };

  // Reset pageParams on config change
  useEffect(() => {
    setPageParams(prev => ({
      ...prev,
      page: 1,
      ...stableConfig,
    }));
    setAllDocs([]); // Added: Reset docs when config changes
  }, [JSON.stringify(stableConfig)]);

  // Reset on resetKey change
  useEffect(() => {
    if (resetKey) {
      setPageParams({
        page: 1,
        limit: config.limit || 2,
        ...config,
      });
      setAllDocs([]);
    }
  }, [resetKey]);

  // Reset isRefresh state when fetching is done
  useEffect(() => {
    if (!isFetching && isRefresh) {
      setIsRefresh(false);
    }
  }, [isFetching, isRefresh]);

  return {
    data: { ...data, docs: allDocs, ...pageParams }, // Return accumulated docs and pagination metadata
    isLoading,
    isFetching,
    loadMore,
    refresh,
    isRefresh,
    refetch,
    error,
  };
};
