//import liraries
import React, {useEffect} from 'react';
import RootNavigation from '@Navigation';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './src/redux';
import EStyleSheet from 'react-native-extended-stylesheet';

export const reduxPersistStore = persistStore(reduxStore)

export const resetStore = async () => {
  await reduxPersistStore.purge();
  reduxStore.dispatch(resetStore());
  await reduxPersistStore.flush();
};

// create a component
const App = () => {

  useEffect(() => {
    EStyleSheet.build();
  })
  return (    
    <Provider store={reduxStore}>
      <PersistGate persistor={reduxPersistStore}>
        <RootNavigation />
      </PersistGate>
    </Provider>      
  );
};


//make this component available to the app
export default App;
