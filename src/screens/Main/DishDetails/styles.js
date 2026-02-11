import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../utils/Colors";
import { family, size, vw } from "../../../utils";
import Shadows from "../../../helpers/Shadows";

const {width,height} = Dimensions?.get('screen')
export const styles = StyleSheet.create({
    input: {
        borderWidth: 1.5,
        borderColor: '#EDEDED',
        padding: 10,
        paddingHorizontal: 12,
        borderRadius: 50,
        backgroundColor: colors?.placeholderColor,
        fontSize: size.medium,
        fontFamily: family?.Gilroy_SemiBold,
        marginBottom: 15
    },
    focusedInput: {
        borderColor: colors?.iconColor,
    },
    titleSection: {
        paddingHorizontal: vw * 5,
        paddingVertical: 15,
        marginTop: 10,
        gap: 3,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    item: {
        marginVertical: 5,
        height: height * 0.15,
        padding: 10,
        borderRadius: 10
    },
    hr: {
        borderTopWidth: 1,
        borderColor: colors?.lightGrayLine,
        marginTop: 15,
        marginBottom: 15,
        width: '90%',
        alignSelf: 'center',
    },
    workItems: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    imageContainer: {
        width: width / 3 - 23,
        height: width / 3 - 23,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 5,
    },
    galleryRow: {
        justifyContent: 'space-between',
    },
    galleryList: {
        marginTop: height * 0.015,
    },
    viewCartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.05,
        alignSelf: 'center',
        backgroundColor: colors?.secondary,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 10
    }, 
    variationContainer: {
        backgroundColor: 'white',
        ...Shadows?.shadow5,
        borderRadius: 10,
        padding: height * 0.02,
        width: '100%',
        height: height * 0.21,
        marginTop: height * 0.01
    }
});
