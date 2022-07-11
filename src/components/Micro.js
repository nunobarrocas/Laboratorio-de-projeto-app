import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {updateSpeech} from '../redux/actions/speech';
import * as speechActions from '@Action/speech.js';
import PropTypes from 'prop-types';

const Micro = (props) => {
  const {text, updateSpeech} = props;
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {    
      Voice.onSpeechStart = onSpeechStartHandler;
      Voice.onSpeechEnd = onSpeechEndHandler;
      Voice.onSpeechResults = onSpeechResultsHandler;    
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      
    };
  }, []);

  const onSpeechStartHandler = e => {
    console.log('start handler==>>>', e);
  };

  const onSpeechEndHandler = e => {
    setLoading(false);      
    console.log('stop handler', e);      
  };

  const onSpeechResultsHandler = e => {
      let itext = e.value[0];
      setResult(itext);
      updateSpeech(itext);
      console.log('speech result handler', e);
      console.log('state', props);  
      Voice.destroy().then(Voice.removeAllListeners);
  };

  const startRecording = async () => {
    setLoading(true);  
    await Voice.start('en-Us');
    
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#148AA0" />
      ) : (
        <TouchableOpacity onPress={startRecording}>
          <Icon name="microphone" size={25} color={'#148AA0'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 25
  },
});

Micro.propTypes = {
  text: PropTypes.string,
  updateSpeech: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    text: state.speech.text,
  };
};

const mapDispachToProps = dispatch => ({
  updateSpeech: text => dispatch(speechActions.updateSpeech(text)),
});

//make this component available to the app
export default connect(mapStateToProps, mapDispachToProps)(Micro);