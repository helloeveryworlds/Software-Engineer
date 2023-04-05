import AsyncStorage from '@react-native-async-storage/async-storage';

const retrieveData = () => {
    AsyncStorage.getItem("userDetails").then((res) => {
      const response = JSON.parse(res);
      if (res !== null) {
        module.exports = global.config = {
            i18n: {
                welcome: {
                    data: response.data
                }
                // rest of your translation object
            }
            // other global config variables you wish
        };
        console.log("Response...", response.data);
        // return response;
      } else {
        console.log("No response...", response);
      }
    });
  }

  
  export default retrieveData;