import React from 'react';
import {
  StyleSheet,
} from 'react-native';

var styles = StyleSheet.create({
  headerIcon: {
    borderColor: '#f1c40f',
    borderWidth: 3,
    borderRadius: 50,
    width: 75,
    height:  75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  layout: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    backgroundColor: '#34495e',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection:'row',
    paddingLeft: 16,
    paddingTop: 16
  },
  textItem: {
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 16,
    color: '#455A64'
  }
});

module.exports = styles;
