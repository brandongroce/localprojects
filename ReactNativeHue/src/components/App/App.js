import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  Modal
} from 'react-native';

import Bulb from '../Bulb/Bulb';
import Reload from '../Reload/Reload';
import Star from '../Star/Star';
import Palette from '../Palette/Palette';
import Bridge from '../Bridge/Bridge';
import HueApi from '../jshue/jshue';
import ColorConvert from 'color-convert';
import styles from './Styles'

var ReactNativeView = React.createClass({
  getInitialState: function() {
    return {
      hue: HueApi.bind(null, XMLHttpRequest, JSON)(),
      palette: {name:'', creator:'', colors: []},
      modalVisible: false
    };
  },
  componentWillMount: function() {
    AsyncStorage.getItem("lastPalette").then((value) => {
        if (value){
          if (this.props.paletteStar) {
            this.setState({palette: this.props.paletteStar});
            this.changePalette(this.props.paletteStar);
            this.refs['RELOAD']._animate();
          } else {
            this.setState({palette: JSON.parse(value)});
            this.changePalette(this.state.palette);
            this.refs['RELOAD']._animate();
          }
        } else {
          this.setState({palette: {name:'Giant Goldfish', creator:'By manekineko', colors: ['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900']}});
        }
    }).done();
  },
  componentDidMount: function(){
    // this.connectToBridge();
  },
  changePalette: function(palette) {
       this.refs.BULB0.animate(0, palette.colors[0]);
       this.refs.BULB1.animate(200, palette.colors[1]);
       this.refs.BULB2.animate(400, palette.colors[2]);
       this.refs.BULB3.animate(600, palette.colors[3]);
       this.refs.BULB4.animate(800, palette.colors[4]);
       this.setState({palette: palette});
       AsyncStorage.setItem('lastPalette', JSON.stringify(palette));
       this.changeLights();
  },
  _setModalVisible(visible) {
    this.connectToBridge();
    this.setState({modalVisible: visible});
  },
  connectToBridge: function() {
    const _this = this;
    AsyncStorage.getItem("ip").then((ipBride) => {
      AsyncStorage.getItem("user").then((userName) => {
        if (ipBride && userName) {
          const bridge = this.state.hue.bridge(ipBride);
          const user = bridge.user(userName);
          _this.setState({userName: userName, ip: ipBride, user: user});
          _this.changeLights();
        } else {
          this.setState({modalVisible: true});
        }
      }).done();
    }).done();
  },
  changeLights: function() {
    const _this = this;
    if (this.state.user) {
      this.state.palette.colors.map(function(item, i) {
        const RGB = ColorConvert.hex.rgb(item);
        const XY = _this.toXY(RGB);
        var stateLights = _this.state.user.getLights();
        _this.state.user.setLightState(i+1, { on: stateLights[i+1].state.on, xy: XY}, function(data) {console.log(data)}, function(err) {console.log(err)});
      })
    }
  },
  turnLight: function(index, state) {
    if (this.state.user) {
      this.state.user.setLightState(index + 1, { on: state}, function(data) {console.log(data)}, function(err) {console.log(err)});
    }
  },
  loadStar(){
    if (this.props.paletteStar) {
      this.setState({palette: this.props.paletteStar});
      this.changePalette(this.props.paletteStar);
      this.refs['RELOAD']._animate();
    }
  },
  toXY(RGB) {
    let red = RGB[0];
    let green = RGB[1];
    let blue = RGB[2];
    //Gamma correctie
    red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
    green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
    blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);
    //Apply wide gamut conversion D65
    var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
    var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
    var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;
    var fx = X / (X + Y + Z);
    var fy = Y / (X + Y + Z);
    if (isNaN(fx)) {
      fx = 0.0;
    }
    if (isNaN(fy)) {
      fy = 0.0;
    }
    return [fx.toPrecision(4),fy.toPrecision(4)];
  },
  render: function() {
    return (
     <View style={styles.body}>

       <View style={styles.header}>
         <Reload ref="RELOAD" palette={this.state.palette} changePalette={this.changePalette} />
       </View>

       <View style={styles.content}>
         {this.state.palette.colors.map(function(item, i) {
          return (
            <Bulb turnLight={this.turnLight}  index={i} key={i} title={item} ref={'BULB' + i} color={item} text={'On'} />
          );
        }, this)}
        </View>

       <View style={styles.footer}>
         <Star palette={this.state.palette} />
         <Palette colors={this.state.palette.colors}/>
         <Text numberOfLines={1} style={{fontWeight: '800', color: '#000', fontSize: 25, padding: 4}}>
           {this.state.palette.name}
         </Text>
         <Text numberOfLines={1} style={{fontWeight: '800', color: '#ccc', fontSize: 13}}>
           {this.state.palette.creator}
         </Text>
       </View>

      <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={[styles.container]}>
            <View style={[styles.innerContainer]}>
              <Bridge
                onPress={this._setModalVisible.bind(this, false)}>
              </Bridge>
             </View>
          </View>
        </Modal>
     </View>
    );
  }
});

module.exports = ReactNativeView;
