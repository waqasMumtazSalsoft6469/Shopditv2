import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomIcon from './CustomIcon';
import {appIcons, appImages} from '../assets';
import {family, size} from '../utils';
import CustomText from './CustomText';
import ImagePicker2 from './ImagePicker2';
import {colors} from '../utils/Colors';
import {HP, WP} from '../utils/styling/responsive';
import { extractFileName } from '../utils/helperFunction';

// const CustomMultiImagePicker = ({
//   handleImage,
//   labelTitle,
//   staric,
//   title,
//   errors,
// }) => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   console.log('error-multiimage', errors);

//   const handleImageChange = (imagePaths, mime, type) => {
//     if (selectedImages.length + imagePaths.length <= 10) {
//       const updatedImages = [...selectedImages, ...imagePaths];
//       setSelectedImages(updatedImages);
//       handleImage(updatedImages);
//     } else {
//       Alert.alert('Limit Reached', 'You can only add up to 10 images.');
//     }
//   };

//   const removeImage = index => {
//     const updatedImages = selectedImages.filter((_, i) => i !== index);
//     setSelectedImages(updatedImages);
//     handleImage(updatedImages);
//   };

//   return (
//     <>
//       <View style={styles?.labelWrap}>
//         <CustomText
//           text={labelTitle}
//           font={family?.medium}
//           size={size?.large}
//         />
//         {staric && <CustomText text="*" color={colors?.red} size={size?.h5} />}
//       </View>
//       <View style={styles.container}>
//         <View style={styles.imageContainer}>
//           {selectedImages.map((image, index) => (
//             <View key={index} style={styles.imageWrapper}>
//               <ImageBackground
//                 source={{uri: image}}
//                 style={styles.image}
//                 borderRadius={10}>
//                 <TouchableOpacity
//                   style={styles.removeIcon}
//                   activeOpacity={0.9}
//                   onPress={() => {
//                     removeImage(index);
//                   }}>
//                   <CustomIcon
//                     src={appIcons?.cut}
//                     size={size?.h1}
//                     disabled={true}
//                     customIconWrapper={{
//                       borderWidth: 2,
//                       borderColor: colors?.white,
//                       backgroundColor: colors?.white,
//                       borderRadius: 50,
//                     }}
//                   />
//                 </TouchableOpacity>
//               </ImageBackground>
//             </View>
//           ))}
//           {selectedImages.length <= 10 && (
//             <ImagePicker2
//               onImageChange={handleImageChange}
//               uploadVideo={false}
//               isMultiple={true}>
//               <View style={styles.addImageWrapper}>
//                 <ImageBackground
//                   style={styles.image}
//                   source={appImages?.car1}
//                   borderRadius={10}>
//                   <View style={styles.overlay} />
//                   <CustomIcon
//                     src={appIcons?.add}
//                     size={HP(2.5)}
//                     tintColor={colors?.white}
//                   />
//                 </ImageBackground>
//               </View>
//             </ImagePicker2>
//           )}
//         </View>
//       </View>
//       {errors && (
//         <View style={{marginBottom: HP('2%'), alignSelf: 'flex-start'}}>
//           <CustomText
//             text={errors}
//             size={size?.medium}
//             color={colors?.red}
//             font={family?.Gilroy_Medium}
//           />
//         </View>
//       )}
//     </>
//   );
// };

const CustomMultiImagePicker = ({
  handleImage,
  labelTitle,
  staric,
  title,
  errors,
  initialImages,
  onRemoveOldImage,
}) => {
  const [profileImages, setProfileImages] = useState(initialImages || []);
  const [removedOldImages, setRemovedOldImages] = useState([]);
  // Sync profileImages with initialImages when it changes
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      console.log('Initial Images in DocumentImagePicker:', initialImages);
      setProfileImages(initialImages);
    }
  }, [initialImages]);
  const handleImageChange = (imagePaths, mime, type) => {
    const imagesArray = Array.isArray(imagePaths) ? imagePaths : [imagePaths];
    const MAX_IMAGES = 10;
    if (profileImages.length + imagesArray.length > MAX_IMAGES) {
      Alert.alert(
        'Limit Reached',
        `You can only upload up to ${MAX_IMAGES} images.`,
      );
      return;
    }

    const newImages = imagesArray.map(path => {
      let img = extractFileName(path);
      return {
        uri: path,
        type: mime,
        name: img,
      };
    });
    const updatedImages = [...profileImages, ...newImages];

    setProfileImages(updatedImages);
    if (handleImage) handleImage(updatedImages);
  };
  const removeImage = index => {
    const imageToRemove = profileImages[index];

    const updatedImages = profileImages.filter((_, i) => i !== index);
    setProfileImages(updatedImages);
    if (handleImage) handleImage(updatedImages);

    // Check if it's from initialImages
    const isOld = initialImages?.some(img => img.uri === imageToRemove.uri);
    if (isOld) {
      const updatedRemoved = [...removedOldImages, imageToRemove];
      setRemovedOldImages(updatedRemoved);
      if (onRemoveOldImage) onRemoveOldImage(updatedRemoved); // Notify parent
    }
  };

  return (
    <>
      <View style={styles?.labelWrap}>
        <CustomText
          text={labelTitle}
          font={family?.medium}
          size={size?.large}
        />
        {staric && <CustomText text="*" color={colors?.red} size={size?.h5} />}
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {profileImages.map((image, index) => {
            return (
              <View key={index} style={styles.imageWrapper}>
                <ImageBackground
                  source={{uri: image?.uri}}
                  style={styles.image}
                  defaultSource={appImages?.placeholder}
                  borderRadius={10}>
                  <TouchableOpacity
                    style={styles.removeIcon}
                    activeOpacity={0.9}
                    onPress={() => {
                      removeImage(index);
                    }}>
                    <CustomIcon
                      src={appIcons?.cut}
                      size={size?.h1}
                      disabled={true}
                      customIconWrapper={{
                        borderWidth: 2,
                        borderColor: colors?.white,
                        backgroundColor: colors?.white,
                        borderRadius: 50,
                      }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            );
          })}
          {profileImages.length <= 10 && (
            <ImagePicker2
              onImageChange={handleImageChange}
              uploadVideo={false}
              isMultiple={true}>
              <View style={styles.addImageWrapper}>
                <ImageBackground
                  style={styles.image}
                  source={appImages?.car1}
                  borderRadius={10}>
                  <View style={styles.overlay} />
                  <CustomIcon
                    src={appIcons?.add}
                    size={HP(2.5)}
                    tintColor={colors?.white}
                    disabled
                  />
                </ImageBackground>
              </View>
            </ImagePicker2>
          )}
        </View>
      </View>
      {errors && (
        <View style={{marginBottom: HP('2%'), alignSelf: 'flex-start'}}>
          <CustomText
            text={errors}
            size={size?.medium}
            color={colors?.red}
            font={family?.Gilroy_Medium}
          />
        </View>
      )}
    </>
  );
};

export default CustomMultiImagePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: WP('90%'),
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: WP('1%'),
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    // gap: HP('1%'),
    height: WP('15%'),
    width: WP('15%'),
    borderRadius: 10,
  },
  overlay: {
    height: WP('15%'),
    width: WP('15%'),
    borderRadius: 10,
    backgroundColor: '#FF2873',
    position: 'absolute',
  },
  removeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  addImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelWrap: {
    flexDirection: 'row',
    marginLeft: WP('4%'),
    justifyContent: 'flex-start',
    width: WP('90%'),
    marginTop: HP('1%'),
  },
});
