import React, { useState } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { colors } from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import { appIcons, appImages } from '../../../assets';
import CustomText from '../../../components/CustomText';
import { family, size, vh, vw } from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import {
  couponData,
  couponData2,
  dishes,
  restaurantGallery,
  restaurantTiming,
  reviewDetails,
} from '../../../utils/dummyData';
import CustomIcon from '../../../components/CustomIcon';
import CustomTextInput, {
  CustomTextAreaInput,
  SearchInput,
} from '../../../components/CustomTextInput';

import CustomCard from '../../../components/CustomCard';
import TabComponent from '../../../components/TabComponent';
import Shadows from '../../../helpers/Shadows';
import NavService from '../../../helpers/NavService';
import RatingWidget from '../../../components/RatingWidget/Index';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import Share from 'react-native-share';
import Coupon from '../../../components/Coupon';
import CustomButton from '../../../components/CustomButton';
import { getImageUrl, LOG } from '../../../utils/helperFunction';
import { useFetchBusinessProductQuery } from '../../../Api/businessApiSlice';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import { colors2 } from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import { useFetchCouponByBusinessQuery } from '../../../Api/couponApiSlice';
import { useAddMutation } from '../../../Api/reviewApiSlice';
import { executeApiRequest } from '../../../Api/methods/method';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');
const DealItemDetails = ({ route }) => {
  const token = useSelector(state => state?.auth?.token);

  const [selectedTab, setSelectedTab] = useState('About');
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState(''); // State for review input
  const [add, { isLoading: addLoading }] = useAddMutation();
  const { cardItem } = route.params;
  LOG('CARD ITEMs: ', cardItem);
  const tabs = ['About', 'Popular', 'Special Deals', 'Exclusive Discounts'];
  const options = {
    url: 'https://reactnative.dev/docs/share',
    title: 'Share this with a friend!',
    message: `Amazing deals available on Shopdit from ${cardItem?.businessName.toString()}. Check now!`,
  };
  const shareApp = async () => {
    try {
      const res = await Share.open(options);
      console.log(res);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const renderGalleryItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <FastImage
        source={getImageUrl(item)}
        style={styles.image}
        resizeMode="cover"
        defaultSource={appImages?.placeholder}
      />
    </View>
  );

  const { data, isLoading, refetch } = useFetchBusinessProductQuery(
    { businessProfileId: cardItem?._id },
    {
      skip: !cardItem?._id,
    },
  );

  LOG('DATA: ', data?.docs[0]?.variations);

  const {
    data: couponData2,
    isLoading: couponLoading,
    refetch: couponRefetch,
  } = useFetchCouponByBusinessQuery(
    { businessProfileId: cardItem?._id },
    {
      skip: !cardItem?._id || selectedTab !== 'Special Deals',
    },
  );
  LOG('BUSINESS Coupon: ', couponData2);

  const handleRatingSelected = rating => {
    console.log('Selected Rating:', rating); // Debug log
    setUserRating(rating);
  };

  const handleSubmitRating = async (rating, review) => {
    if (userRating <= 0) {
      Alert.alert('Error', 'Please select a rating.');
      return;
    }
    if (!review.trim()) {
      Alert.alert('Error', 'Please add a review.');
      return;
    }
    // Log the values for you to use in your API call
    console.log('Submitting - Rating:', rating);
    console.log('review:', review);

    let payload = {
      rating,
      message: review,
      type: 'Business',
      businessProfile: cardItem?._id,
    };

    LOG('PAYLOAD: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      toast: true,
      timeout: 30000,
    });
    if (response) {
      setUserRating(0); // Reset rating
      setReview(''); // Reset review
    }

    // Alert.alert('Success', 'Rating and review ready for submission!');
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'About':
        return (
          <>
            {/* <View>
              <CustomText
                text={'WORKING HOURS'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View style={styles?.workItems}>
                <CustomIcon size={size?.h6} src={appIcons?.timing} />
                {restaurantTiming.map((item, index) => (
                  <View key={index} style={styles.item}>
                    <CustomText
                      style={{textAlign: 'justify', marginTop: -1}}
                      text={item?.timing}
                      size={size?.large}
                      font={family?.Questrial_Regular}
                      color={colors?.placeholderText}
                    />
                  </View>
                ))}
              </View>
            </View> */}
            {/* <View style={[styles?.hr, {width: '100%'}]} /> */}
            <View>
              <CustomText
                text={'ABOUT RESTAURANT'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />

              <CustomText
                style={{
                  textAlign: 'justify',

                  lineHeight: height * 0.03,
                }}
                text={cardItem?.about}
                size={size?.large}
                font={family?.Questrial_Regular}
                color={colors?.placeholderText}
              />
            </View>
            <View style={[styles?.hr, { width: '100%' }]} />
            <View>
              <CustomText
                text={'ADDRESS'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View
                style={[
                  styles?.workItems,
                  { marginTop: vh * 1, alignItems: 'flex-start' },
                ]}>
                <CustomIcon size={size?.h5} src={appIcons?.address} />

                <View style={{ gap: vw * 1 }}>
                  <CustomText
                    style={{ textAlign: 'justify' }}
                    text={cardItem?.location?.address}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                  <CustomText
                    style={{ textAlign: 'justify' }}
                    text={`Zip Code: ${cardItem?.address?.zipCode}`}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              </View>
            </View>
            <View style={[styles?.hr, { width: '100%' }]} />

            <View>
              <CustomText
                text={'EIN'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View style={[styles?.workItems, { marginTop: vh * 1 }]}>
                <View style={{ gap: vw * 1 }}>
                  <CustomText
                    style={{ textAlign: 'justify' }}
                    text={cardItem?.ein}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              </View>
            </View>
            <View style={[styles?.hr, { width: '100%' }]} />
            {cardItem?.instagram && (
              <>
                <View>
                  <CustomText
                    text={'Instagram'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
                  <View style={[styles?.workItems, { marginTop: vh * 1 }]}>
                    <CustomIcon
                      size={size?.h5}
                      src={appIcons?.instagram}
                      tintColor={colors?.iconColor}
                    />

                    <CustomText
                      style={{ textAlign: 'justify' }}
                      text={cardItem?.instagram}
                      size={size?.large}
                      font={family?.Questrial_Regular}
                      color={colors?.placeholderText}
                    />
                  </View>
                </View>
                <View style={[styles?.hr, { width: '100%' }]} />
              </>
            )}
            {cardItem?.facebook && (
              <>
                <View>
                  <CustomText
                    text={'Facebook'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
                  <View style={[styles?.workItems, { marginTop: vh * 1 }]}>
                    <CustomIcon
                      size={size?.h5}
                      src={appIcons?.facebook}
                      tintColor={colors?.iconColor}
                    />

                    <CustomText
                      style={{ textAlign: 'justify', marginTop: -1 }}
                      text={cardItem?.facebook}
                      size={size?.large}
                      font={family?.Questrial_Regular}
                      color={colors?.placeholderText}
                    />
                  </View>
                </View>
                <View style={[styles?.hr, { width: '100%' }]} />
              </>
            )}
            {cardItem?.tiktok && (
              <>
                <View>
                  <CustomText
                    text={'Tiktok'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
                  <View style={[styles?.workItems, { marginTop: vh * 1 }]}>
                    <CustomIcon
                      size={size?.h5}
                      src={appIcons?.tiktok}
                      tintColor={colors?.iconColor}
                    />

                    <CustomText
                      style={{ textAlign: 'justify', marginTop: -1 }}
                      text={cardItem?.tiktok}
                      size={size?.large}
                      font={family?.Questrial_Regular}
                      color={colors?.placeholderText}
                    />
                  </View>
                </View>
                <View style={[styles?.hr, { width: '100%' }]} />
              </>
            )}

            <View>
              <CustomText
                text={'GALLERY'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <FlatList
                data={cardItem?.gallery}
                scrollEnabled={false}
                renderItem={renderGalleryItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                columnWrapperStyle={styles.galleryRow}
                contentContainerStyle={styles.galleryList}
              />
            </View>
            <View style={[styles?.hr, { width: '100%' }]} />

            {token &&
              <>
                <View>
                  <CustomText
                    text={'RATE RESTAURANT'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
                  <View style={{ marginTop: vh * 2 }}>
                    {/* Rating Selection - Mandatory */}
                    <View style={{ marginBottom: vh * 2 }}>
                      <CustomText
                        text={'How would you rate this restaurant? *'}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                        color={colors?.placeholderText}
                        style={{ marginBottom: vh * 1 }}
                      />
                      <RatingWidget
                        key={userRating}
                        onRatingSelected={handleRatingSelected}
                        initialRating={userRating}
                        starSize={vh * 4}
                        starGap={vw * 6}
                        starColor={colors?.yellow}
                      />
                      {userRating > 0 && (
                        <CustomText
                          text={`Selected: ${userRating} star${userRating > 1 ? 's' : ''
                            }`}
                          font={family?.Gilroy_Medium}
                          size={size?.medium}
                          color={colors?.headingText}
                          style={{ marginTop: vh * 1 }}
                        />
                      )}
                    </View>

                    {/* review Input - Mandatory */}
                    <View style={{ width: '90%', marginBottom: vh * 2 }}>
                      <CustomTextAreaInput
                        textInputTitle={true}
                        labelTitle={'Review'}
                        staric={true} // Mandatory indicator
                        placeholder={'Enter your review here...'}
                        placeholderColor={colors?.placeholderText}
                        value={review}
                        onChangeText={text => setReview(text)} // Update review state
                        error={
                          !review.trim() && userRating > 0
                            ? 'Review is required'
                            : ''
                        } // Show error if submit attempted without review
                        containerStyle={[styles.input, { borderRadius: 15 }]}
                        multiline={true}
                        numberOfLines={4} // Larger input for reviews
                      />
                    </View>

                    {/* Submit Button - Only show if rating selected */}
                    {userRating > 0 && (
                      <View>
                        {addLoading ? (
                          <ActivityLoader color={colors?.secondary} /> // Use colors?.primary for consistency
                        ) : (
                          <TouchableOpacity
                            style={[
                              styles.submitButton,
                              { backgroundColor: colors?.primary },
                            ]}
                            onPress={() => handleSubmitRating(userRating, review)}
                            disabled={addLoading} // Disable button during loading
                          >
                            <CustomText
                              text={'Submit Rating'}
                              font={family?.Gilroy_SemiBold}
                              size={size?.large}
                              color={colors?.white}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                </View>
                <View style={[styles?.hr, { width: '100%' }]} />
              </>


            }
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <CustomText
                  text={'REVIEW OF MULTIPLE SOURCES'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h6}
                  color={colors?.headingText}
                  numberOfLines={1}
                />
              </View>
              <View
                style={[
                  styles?.workItems,
                  {
                    flexDirection: 'column',
                    gap: vh * 2.5,
                    marginTop: height * 0.01,
                    paddingHorizontal: 10,
                  },
                ]}>
                {reviewDetails.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.item,
                      {
                        ...Shadows?.shadow5,
                        backgroundColor: 'white',
                        width: '100%',
                        paddingHorizontal: 10,
                      },
                    ]}>
                    <View style={{ justifyContent: 'center' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: height * 0.015,
                            alignItems: 'center',
                          }}>
                          <View style={{ width: vw * 13, height: vh * 8 }}>
                            <Image
                              source={item?.image}
                              resizeMode="contain"
                              style={{ width: '100%', height: '100%' }}
                            />
                          </View>
                          <View
                            style={{
                              gap: 3,
                              alignItems: 'flex-start',
                              marginTop: 2,
                            }}>
                            <CustomText
                              text={item?.name}
                              size={size?.xxlarge}
                              font={family?.Gilroy_Medium}
                              color={colors?.blackShade}
                            />
                            <View style={{ alignItems: 'center', left: -3 }}>
                              <RatingWidget
                                initialRating={5}
                                disabled={true}
                                starSize={14}
                                starGap={item?.gap}
                                customStyle={{
                                  backgroundColor: item?.backgroundColor,
                                  alignItems: 'center',
                                }}
                                starColor={item?.color}
                              />
                            </View>
                            <CustomText
                              text={item?.reviewDate}
                              size={size?.medium}
                              font={family?.Questrial}
                              color={colors?.placeholderText}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            width: item?.iconWidth,
                            height: item?.iconHeight,
                          }}>
                          <Image
                            source={item?.icon}
                            resizeMode="contain"
                            style={{ width: '100%', height: '100%' }}
                          />
                        </View>
                      </View>
                      <View style={{ marginTop: vh * 3 }}>
                        <CustomText
                          text={item?.review}
                          size={size?.large}
                          font={family?.Questrial_Regular}
                          color={colors?.placeholderText}
                          numberOfLines={3}
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </>
        );

      case 'Popular':
        return (
          <>
            <View style={{ left: vw * 3 }}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <CustomIcon size={size?.xxtitle} src={appIcons?.fire} />
                <CustomText
                  text={'Popular'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h1}
                  color={colors?.headingText}
                  numberOfLines={1}
                  style={{ textTransform: 'uppercase' }}
                />
              </View>
              <CustomText
                text={'Most ordered right now!'}
                numberOfLines={1}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
            </View>
            {data?.docs?.length > 0 ? (
              <>
                <PullToRefreshFlatList
                  refetch={refetch}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    alignSelf: 'center',
                  }}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  data={data?.docs}
                  keyExtractor={(item, index) => index.toString()}
                  // ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                  renderItem={({ item, index }) => (
                    <CustomCard
                      restaurantProduct={true}
                      item={item}
                      heart
                      shadowCard
                      onPress={() => {
                        NavService?.navigate('DishDetails', {
                          dishItem: item,
                          id: cardItem?._id,
                        });
                      }}
                    />
                  )}
                  numColumns={2}
                />
              </>
            ) : (
              <PullToRefreshScrollView
                onRefresh={refetch}
                refreshingColor={colors2?.theme?.secondary}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 20,
                  marginTop: vh * 3,
                }}>
                {isLoading && (
                  <ActivityLoader color={colors2?.theme?.secondary} />
                )}
                <EmptyDataComponent
                  message={
                    isLoading ? 'Loading! Please Wait.' : 'No Data Available.'
                  }
                />
              </PullToRefreshScrollView>
            )}
          </>
        );

      case 'Special Deals':
        return (
          <>
            {couponData2?.docs?.length > 0 ? (
              <>
                <PullToRefreshFlatList
                  refetch={couponRefetch}
                  contentContainerStyle={{
                    // paddingBottom: height * 0.08,
                    backgroundColor: colors?.white,
                  }}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  data={couponData2}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Coupon
                      couponItem={item}
                      onPress={() => {
                        // NavService.navigate('CouponDetails', {couponDetails: item});
                      }}
                    />
                  )}
                />
              </>
            ) : (
              <PullToRefreshScrollView
                onRefresh={couponRefetch}
                refreshingColor={colors2?.theme?.secondary}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 20,
                  marginTop: vh * 3,
                }}>
                {couponLoading && (
                  <ActivityLoader color={colors2?.theme?.secondary} />
                )}
                <EmptyDataComponent
                  message={
                    couponLoading
                      ? 'Loading! Please Wait.'
                      : 'No Data Available.'
                  }
                />
              </PullToRefreshScrollView>
            )}
          </>
        );
      case 'Exclusive Discounts':
        return (
          <View
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              gap: vh * 3,
              marginTop: vh * 3,
              marginBottom: vh * 2,
            }}>
            <CustomText
              text={'SUBSCRIBE FOR EXCLUSIVE DEALS'}
              font={family?.Gilroy_SemiBold}
              size={size?.h3}
              color={colors?.headingText}
              numberOfLines={1}
              style={{ textTransform: 'uppercase' }}
            />
            <CustomButton
              gradientColorArr={[colors.secondary, colors.secondary]}
              title={'Buy Now!'.toUpperCase()}
              customWidth={width - 65}
              buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
              textStyle={{ fontSize: size.xxlarge }}
              onPress={() => {
                //   NavService?.navigate('collaborate');
              }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <AppBackground
      back
      notification
      couponDetails={true}
      // restaurantItems={true}
      cart>
      <PullToRefreshScrollView
        onRefresh={
          selectedTab === 'Popular'
            ? refetch
            : selectedTab === 'Special Deals'
              ? couponRefetch
              : null
        }
        refreshingColor={colors2?.theme?.secondary}>
        <CustomContainer
          noImage={false}
          scrollEnabled={false}
          bgImage={getImageUrl(cardItem?.image)}
          customItemStyles={{ marginTop: -height * 0.04 }}
          bannerStyle={{
            backgroundColor: '#F6F6F6',
            height: height / 2.2,
            marginTop: -height * 0.01,
          }}>
          <View style={[styles?.titleSection]}>
            <View style={styles?.nameContainer}>
              <View style={styles?.iconContainer}>
                <FastImage
                  source={getImageUrl(cardItem?.image)}
                  resizeMode="cover"
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                  defaultSource={appImages?.placeholder}
                />
              </View>
              <View style={{ marginTop: vh * 1, gap: 3, alignItems: 'center' }}>
                <CustomText
                  text={cardItem?.businessName.toString()}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h3}
                  color={colors?.headingText}
                  numberOfLines={1}
                  style={{ textTransform: 'uppercase' }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    gap: vw * 3,
                    alignItems: 'center',
                  }}>
                  <RatingWidget
                    initialRating={5}
                    disabled={true}
                    starSize={20}
                    starGap={vw * 1.8}
                  />
                  <CustomText
                    text={'4.9 ( 1400+ Ratings)'}
                    font={family?.Questrial_Regular}
                    size={size?.large}
                    color={colors?.placeholderText}
                    numberOfLines={1}
                    underline
                  />
                </View>
                <TouchableOpacity
                  style={{ marginTop: 10, alignSelf: 'center' }}
                  activeOpacity={0.3}
                  onPress={() => shareApp()}>
                  <CustomText
                    text={'Share Restaurant'}
                    font={family?.Questrial_Regular}
                    size={size?.large}
                    color={colors?.placeholderText}
                    numberOfLines={1}
                    underline
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginBottom: height * 0.02 }}>
              <SearchInput placeholder={'Search In Menu...'} />
            </View>

            <TabComponent
              tabs={tabs}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
            />
            <View>{renderTabContent()}</View>
          </View>
        </CustomContainer>
      </PullToRefreshScrollView>
    </AppBackground>
  );
};

export default DealItemDetails;
