import React, { useRef } from 'react';
import {
    Dimensions,
    FlatList,
    View,
} from 'react-native';
import { colors } from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import { AllCouponData, carData, FlippData } from '../../../utils/dummyData';
import CustomCard from '../../../components/CustomCard';
import { SearchInput } from '../../../components/CustomTextInput';
import BottomSheet from '../../../components/BottomSheet';

const { width, height } = Dimensions.get('screen');
const Flipp = ({ route }) => {
    return (
        <AppBackground
            back={true}
            title={'Flipp'}
            notification
        >
            <View style={{ paddingHorizontal: 20, paddingVertical: 15, marginTop: 10 }}>
                <SearchInput placeholder={'Search Circulars or items..'} />
                <FlatList
                    style={{ marginTop: height * 0.01,  }}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        paddingVertical: 20,
                        paddingBottom: height*0.18
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
            </View>
          
        </AppBackground>
    )
}

export default Flipp; 
