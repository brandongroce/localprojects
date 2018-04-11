import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, AppRegistry, Image, Animated, Easing } from 'react-native';
import styles from './Styles'
var TIMES = 400;
var Reload = React.createClass({
  getInitialState: function() {
    return {
      opacity: 1,
      angle: new Animated.Value(0)
    };
  },
  componentDidMount: function() {
  },
  _onPressButton: function(){
    var _this = this;
    _this._animateLoad();
    fetch('http://www.colourlovers.com/api/palettes/random?format=json', {
        method: 'get'
    }).then(function(response) {
        var colorLover = JSON.parse(response._bodyInit)[0];
        if (colorLover.colors.length!==5){
          _this._onPressButton();
          return;
        }
        _this._animate();
        colorLover.colors.map(function(item, index){
          colorLover.colors[index]='#' + item
        });
        _this.props.changePalette({id: colorLover.id, name: colorLover.title, creator: 'by ' + colorLover.userName, colors: colorLover.colors});
    }).catch(function(err) {
        //error
        console.log(err);
    });
  },
  _animate() {
    this.state.angle.setValue(0);
    Animated.sequence([
      Animated.timing(this.state.angle, {
        toValue: 360,
        duration: 1200,
        easing: Easing.linear
      })
    ]).start();

  },
  _animateLoad() {
    this.state.angle.setValue(0);

    Animated.sequence([
      Animated.timing(this.state.angle, {
        toValue: -800,
        duration: 3000,
        easing: Easing.linear
      }),
    ]).start();
  },
  render: function() {
    return (
      <TouchableHighlight style={styles.buttonLogo} onPress={this._onPressButton} activeOpacity={0.5} underlayColor={'#fff'}>
        <Animated.Image
         style={[styles.logo,{transform: [
                {rotate: this.state.angle.interpolate({
                  inputRange: [-360, 0],
                  outputRange: ['360deg', '0deg']
                })},
              ]} ]}
         source={require('./arrow.png')}
        />
    </TouchableHighlight>
    );
  }
});

module.exports = Reload;
