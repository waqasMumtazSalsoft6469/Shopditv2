import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    View,
} from 'react-native';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import { automobile, FlippData, GroceryType, marketplaceData, restaurants, type } from '../../../utils/dummyData';
import { SearchInput } from '../../../components/CustomTextInput';
import CustomCard from '../../../components/CustomCard';
import HorizontalFlatList from '../../../components/HorizontalFlatlist';
import { vw } from '../../../utils';

const { width, height } = Dimensions.get('screen');

const ShopDetails = ({ route }) => {
    const [selectedType, setSelectedType] = useState(null);

    const handleTypePress = (id) => {
        setSelectedType(id);
    };

    const { marketItem } = route.params;
    console.log("market:  ", marketItem)
    return (
        <AppBackground
            back={true}
            title={marketItem?.name}
            notification
        >
            {marketItem?.name === 'GROCERY' ? (
                <View style={{ paddingHorizontal: 20, paddingVertical: 15, marginTop: 10, marginBottom: height * 0.07, alignItems: 'center' }}>
                    <SearchInput placeholder={'Search for Coupons'} />

                    {/* Horizontal FlatList for Types */}
                    <HorizontalFlatList data={GroceryType} onItemPress={handleTypePress} />

                    {selectedType === 1 ? (
                        <FlatList
                            key={'FlippList'} // Dynamic key for forcing re-render
                            style={{ marginTop: height * 0.01,  }}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                paddingVertical: 20,
                                paddingBottom: height * 0.18,
                                width: width-vw*10
                            }}
                            showsVerticalScrollIndicator={false}
                            data={FlippData}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                            renderItem={({ item }) => (
                                <CustomCard
                                    FlippCard={true}
                                    item={item}
                                    heart
                                />
                            )}
                        />
                    ) : (
                        <FlatList
                            key={'RestaurantList'} // Dynamic key for forcing re-render
                            style={{ marginTop: height * 0.01 }}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                paddingVertical: 20,
                                paddingBottom: height * 0.16,
                            }}
                            showsVerticalScrollIndicator={false}
                            data={restaurants}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                            renderItem={({ item, index }) => (
                                <CustomCard
                                    product={true}
                                    heart={true}
                                    item={item}
                                    index={index}
                                    onPress={() => {
                                        // Deal item details
                                        NavService.navigate('DealItemDetails', { cardItem: item });
                                    }}
                                />
                            )}
                            numColumns={2}
                        />
                    )}
                </View>
            ) : (
                <View style={{ paddingHorizontal: 20, paddingVertical: 15, marginTop: 10, marginBottom: height * 0.02 }}>
                    <FlatList
                        key={'AutomobileList'} // Static key for this FlatList
                        style={{ marginTop: height * 0.01, marginBottom: height * 0.05 }}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            paddingVertical: 20,
                        }}
                        showsVerticalScrollIndicator={false}
                        data={automobile}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                        renderItem={({ item, index }) => (
                            <CustomCard
                                shopCard={true}
                                item={item}
                                onPress={() => {
                                    NavService.navigate('ShopDetailsItems', { detailItem: item });
                                }}
                            />
                        )}
                        numColumns={2}
                    />
                </View>
            )}
        </AppBackground>
    );
};

export default ShopDetails;
