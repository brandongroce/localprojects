import React from 'react';
import {
  StyleSheet,
} from 'react-native';

var styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  },
  button: {
    padding: 4,
    height: 44,
    overflow: 'hidden',
    backgroundColor: '#34495e'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
    width: 300
  },
  infoText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
    width: 300
  },
  modalButton: {
   position:'absolute',
   bottom: 0
  },
  iconMsg: {
    marginBottom: 30,
  }
});

module.exports = styles;
