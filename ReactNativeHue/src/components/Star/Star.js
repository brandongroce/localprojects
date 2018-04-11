import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, AppRegistry, Image, Animated, Easing, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import styles from './Styles'

var TIMES = 400;

var Star = React.createClass({
  getInitialState: function() {
    return {
      currentFavColor: "#D1D0D7"
    };
  },
  componentDidMount: function() {
  },
  _onPressButton: function(){
    let stars = [];
    let _this = this;
    //Select or deselect fav
    if (this.state.currentFavColor == "#D1D0D7") {
       // Add to fav
       AsyncStorage.getItem('stars').then((value) => {
         if (value) {
           stars = JSON.parse(value);
         }
         stars.push(this.props.palette);
         AsyncStorage.setItem('stars',  JSON.stringify(stars)).then((value) => {
           this.setState({currentFavColor: "#f1c40f" });
         });
       });

    } else {
       // Delete
       AsyncStorage.getItem('stars').then((value) => {
         if (value) {
           stars = JSON.parse(value);
         }
         _.remove(stars, function(n) {
           return n.id == _this.props.palette.id;
         });
         AsyncStorage.setItem('stars',  JSON.stringify(stars)).then((value) => {
           this.setState({currentFavColor: "#D1D0D7" });
         });
       });
    }
  },
  componentWillReceiveProps: function() {
    let stars = [];
    let _this = this;
    let found = false;

    AsyncStorage.getItem('stars').then((value) => {
       stars = JSON.parse(value);
       found = _.find(stars, function(obj) {
        return obj.id == _this.props.palette.id;
       });

       found ? this.setState({currentFavColor: "#f1c40f" }) : this.setState({currentFavColor: "#D1D0D7" });
    })
  },
  render: function() {
    return (
      <Icon.Button style={[styles.startIcon]} name="ios-star" size={40} color={this.state.currentFavColor} backgroundColor={"#F8F8F8"}  onPress={this._onPressButton}>
      </Icon.Button>
    );
  }
});

module.exports = Star;
