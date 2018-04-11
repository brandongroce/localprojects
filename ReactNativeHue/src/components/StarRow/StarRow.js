import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import styles from './Styles'
import Palette from '../Palette/Palette';

var StarRow = React.createClass({
  componentDidMount: function() {

  },
  _onPressButton: function() {
    this.props.selectStar(this.props.palette);
  },
  render: function() {
    return (
      <TouchableHighlight onPress={this._onPressButton} activeOpacity={0.5} underlayColor={'#fff'}>
        <View  style={styles.row}>
          <Palette colors={this.props.palette.colors}/>
          <Text numberOfLines={1} style={{fontWeight: '800', color: '#000', fontSize: 25, padding: 4}}>
            {this.props.palette.name}
          </Text>
          <Text numberOfLines={1} style={{fontWeight: '800', color: '#ccc', fontSize: 13}}>
            {this.props.palette.creator}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = StarRow;
