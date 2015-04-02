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
  ListView,
  ActivityIndicatorIOS
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
      title: "Test Data",
      // component: WebView,
      // passProps: {url: "http://betahikaru.com"}
      component: TestDataList,
      passProps: {url: "http://betahikaru.com/testdata.json"}
    });
  },
});

var TestDataList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: null,
      loaded: false
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(this.props.url)
    .then((response) => response.json())
    .then((responseData) => {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(responseData.data),
        loaded: true
      });
    })
    .done();
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS animating={true} size='small' />
      </View>
    );
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <Text style={styles.listRow}>
            {rowData.title}
          </Text>
        }
        style={styles.listView}
      />
    );
  }
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
  listView: {
  },
  listRow: {
    textAlign: 'center',
    color: '#333333',
    height: 20,
  },
});

AppRegistry.registerComponent('RouterTest', () => RouterTest);
