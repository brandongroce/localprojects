import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  ListView
} from 'react-native';
import styles from './Styles'
import StarRow from '../StarRow/StarRow';

var Starred = React.createClass({
  getInitialState: function() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([])
    };
  },
  componentDidMount: function() {
    this._refreshData();
  },
  loadStar: function() {
    this._refreshData();

},
  _refreshData: function() {
    let stars = [];
    AsyncStorage.getItem('stars').then((value) => {
      if (value) {
        stars = JSON.parse(value);
      }
      this.setState({dataSource: this.state.dataSource.cloneWithRows(stars)});
    });
  },
  _renderRow: function(rowData) {
    return <StarRow selectStar={this.props.selectStar} palette={rowData}/>
  },
  _renderHeader: function() {
    return (<View> <Text> Starred </Text></View>)
  },
  _renderFooter: function() {
    return (<View> <Text> Yeah </Text></View>)
  },
  render: function() {
    return (
       <ListView enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this._renderRow}/>
    );
  }
});

//<ListView dataSource={this.state.dataSource} renderRow={this._renderRow} renderHeader={this._renderHeader} renderFooter={this._renderFooter}/>

module.exports = Starred;
