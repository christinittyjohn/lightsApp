/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const axios = require('axios').default;
const SERVER_URL = 'http://192.168.0.101:8080';
const App: () => React$Node = () => {
  const [status, setStatus] = useState(undefined);

  useEffect(() => {
    axios({
      method: 'get',
      url: SERVER_URL,
    })
      .then(function (response) {
        console.log({response});
        const {data} = response;
        setStatus(data === 1);
      })
      .catch((e) => console.error(e));
  }, []);

  const switchTheLight = () => {
    axios({
      method: 'post',
      url: SERVER_URL,
      data: {
        status: !status ? 1 : 0,
      },
    })
      .then((response) => {
        console.log({response});
      })
      .catch((e) => console.error(e));
    setStatus((status) => !status);
  };
  const backgroundColor = !status ? 'darkgrey' : 'white';
  const invertedBackgroundColor = !status ? 'white' : 'darkgrey';

  const mainTextColor = !status ? 'white' : 'black';
  const switchTextColor = !status ? 'black' : 'white';
  return (
    <>
      <SafeAreaView
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-evenly',
          backgroundColor,
        }}>
        <Text style={{fontSize: 30, color: mainTextColor}}>
          {!status ? 'OFF' : 'ON'}
        </Text>
        <View
          style={{
            borderWidth: 1,
            height: 100,
            width: 75,
            borderColor: 'black',
            borderRadius: 15,
            backgroundColor: invertedBackgroundColor,
            alignItems: 'center',
            elevation: 3,
          }}>
          <TouchableOpacity onPress={switchTheLight} style={{flex: 1}}>
            <Text
              style={{
                fontSize: 15,
                color: switchTextColor,
              }}>
              SWITCH
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
