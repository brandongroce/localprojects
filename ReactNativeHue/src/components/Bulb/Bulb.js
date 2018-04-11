import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, AppRegistry, Animated, Easing } from 'react-native';
import styles from './Styles'

var Bulb = React.createClass({
  getInitialState: function() {
    return {
      opacity: 1,
      angle: new Animated.Value(0),
      text: this.props.text
    };
  },
  componentDidMount: function() {

  },
  handleClick: function(){
    if (this.state.opacity < 1){
      this.setState({opacity: 1, text: 'On'});
      this.props.turnLight(this.props.index, true);
    } else {
      this.setState({opacity: 0.5, text: 'Off'});
      this.props.turnLight(this.props.index, false);
    }
  },
  animate(delay, color) {
   var _this = this;
   this.state.angle.setValue(0);

   setTimeout(function(){_this.setState({color:color})}, delay + 200);

   Animated.sequence([
     Animated.timing(this.state.angle, {
        toValue: 180,
        duration: 200,
        easing: Easing.linear,
        delay: delay
     }),

     Animated.timing(this.state.angle, {
        toValue: 0,
        duration: 600,
        easing: Easing.linear
     })
   ]).start();

  },
  bulbStyle : function() {
   return {
      backgroundColor: this.state.color ? this.state.color : this.props.color,
      opacity : this.state.opacity
   }
 },
  render: function() {
    return (
      <Animated.View style={{transform: [
          {rotateY: this.state.angle.interpolate({
            inputRange: [-360, 0],
            outputRange: ['360deg', '0deg']
          })},
        ]}}>
        <TouchableHighlight style={[styles.bulb, this.bulbStyle()]} onPress={this.handleClick} underlayColor={this.state.color ? this.state.color : this.props.color}>
          <View>
            <Text style={styles.text}>
                {this.state.text}
            </Text>
         </View>
       </TouchableHighlight>
     </Animated.View>
    );
  }
});


module.exports = Bulb;
