import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, AppRegistry } from 'react-native';
import styles from './Styles'

var Palette = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  componentDidMount: function() {

  },
  render: function() {
    return (
      <View style={styles.palette}>
        <TouchableHighlight style={{backgroundColor: this.props.colors[0], width:35, height: 5}} underlayColor='#cdcdcd'>
         <Text></Text>
        </TouchableHighlight>
        <TouchableHighlight style={{backgroundColor: this.props.colors[1], width:35, height: 5}} underlayColor='#cdcdcd'>
         <Text></Text>
        </TouchableHighlight>
        <TouchableHighlight style={{backgroundColor: this.props.colors[2], width:35, height: 5}} underlayColor='#cdcdcd'>
         <Text></Text>
        </TouchableHighlight>
        <TouchableHighlight style={{backgroundColor: this.props.colors[3], width:35, height: 5}} underlayColor='#cdcdcd'>
         <Text></Text>
        </TouchableHighlight>
        <TouchableHighlight style={{backgroundColor: this.props.colors[4], width:35, height: 5}} underlayColor='#cdcdcd'>
         <Text></Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = Palette;
