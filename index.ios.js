/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
  WebView,
} = React;

var RouterTest = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.natigator}
        initialRoute={{
          component: MainListView,
          title: 'RouterTest',
        }}
        tintColor="#4A90C7"
      />
    );
  },
});

var MainListView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableHighlight onPress={this._onPress}>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js{'\n'}
            Press Cmd+R to reload
          </Text>
        </TouchableHighlight>
      </View>
    );
  },
  _onPress: function() {
    this.props.navigator.push({
      title: "xxx",
      component: WebView,
      passProps: {url: "http://betahikaru.com"}
    });
  },
});

var styles = StyleSheet.create({
  natigator: {
    flex: 1,
  },
  container: {
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});

AppRegistry.registerComponent('RouterTest', () => RouterTest);
