import React, {useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';

const PullToRefreshScrollView = ({
  onRefresh,
  children,
  style,
  contentContainerStyle,
  refreshingColor = '#000', // fallback color
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      if (typeof onRefresh === 'function') {
        await onRefresh(); // only call if it's a function
      }
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[refreshingColor]}
          tintColor={refreshingColor}
        />
      }>
      {children}
    </ScrollView>
  );
};

export default PullToRefreshScrollView;
