import React from 'react';
import {
  StyleSheet,
} from 'react-native';

var styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1
  },
  header: {
    alignItems: 'center',
    padding: 60,
    paddingBottom: 40
  },
  body: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    justifyContent: 'space-around',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 100
  },
   container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems:'center',
    justifyContent: 'center'
  },
  innerContainer: {
    backgroundColor: '#F8F8F8',
    height: 400,
    alignItems:'center',
    justifyContent: 'center',
    width: 300
  }
});

module.exports = styles;
