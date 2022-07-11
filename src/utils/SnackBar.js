import Toast from "react-native-simple-toast";
import Snackbar from "react-native-snackbar";

export const showSnackBar = (msg, type = 'INFO') => {
    Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: type =='ERROR' ? '#f00' : '#148AA0',
        
    })
}

export const showToast = (msg) => {
    Toast.show(msg)
}