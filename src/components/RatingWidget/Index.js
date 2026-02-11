// import React, { useState, useEffect } from 'react';
// import { vh, vw } from '../../utils';
// import StarRating from 'react-native-star-rating-widget';
// import { StyleSheet, View } from 'react-native';

// const RatingWidget = ({ initialRating = 0, starSize, disabled, starGap, customStyle, starColor }) => {
//   const [starCount, setStarCount] = useState(initialRating);

//   useEffect(() => {
//     setStarCount(initialRating);  // Update star count if initialRating changes
//   }, [initialRating]);

//   const onStarRatingPress = (rating) => {
//     if (!disabled) {
//       setStarCount(rating);
//     }
//   };

//   return (

//       <StarRating

//         maxStars={5}
//         rating={starCount}
//         onChange={onStarRatingPress}
//         color={starColor ? starColor :"#FFD700" }
//         starSize={starSize ? starSize : 20}
//         containerStyle={{ gap: vh * 0.25, }}
//         fullStarColor={'#FFD700'}
//         emptyStarColor={'black'}
//         halfStarEnabled={true}
//         starStyle={[customStyle, { width: starGap ? starGap : vw * 6, }]}

//       />

//   );
// };

// export default RatingWidget;

// const styles = StyleSheet.create({});

import React, {useState, useEffect} from 'react';
import {vh, vw} from '../../utils';
import StarRating from 'react-native-star-rating-widget';
import {StyleSheet, View} from 'react-native';

const RatingWidget = ({
  initialRating = 0,
  starSize,
  disabled,
  starGap,
  customStyle,
  starColor,
  onRatingSelected, // Added to ensure parent is notified
}) => {
  const [starCount, setStarCount] = useState(initialRating);

  useEffect(() => {
    setStarCount(initialRating); // Sync internal state with prop
  }, [initialRating]);

  const onStarRatingPress = rating => {
    if (!disabled) {
      setStarCount(rating); // Update internal state
      if (onRatingSelected) {
        onRatingSelected(rating); // Notify parent of new rating
      }
    }
  };

  return (
    <View>
      <StarRating
        maxStars={5}
        rating={starCount}
        onChange={onStarRatingPress}
        color={starColor || '#FFD700'} // Fallback to default color
        starSize={starSize || 20} // Fallback to default size
        containerStyle={{gap: starGap || vh * 0.25}} // Use starGap or default
        fullStarColor={'#FFD700'}
        emptyStarColor={'#D3D3D3'} // Changed to lighter gray for better contrast
        halfStarEnabled={true}
        starStyle={[customStyle, {width: starGap || vw * 6}]}
      />
    </View>
  );
};

export default RatingWidget;

const styles = StyleSheet.create({});
