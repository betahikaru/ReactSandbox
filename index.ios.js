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
  ActivityIndicatorIOS,
  Image,
} = React;

var RouterTest = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.natigator}
        initialRoute={{
          component: MainListView,
          title: 'React Native',
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
        <TouchableHighlight
          style={styles.touchable}
          onPress={this._onPress1}>
          <Text style={styles.instructions}>Test Data</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.touchable}
          onPress={this._onPress2}>
          <Text style={styles.instructions}>livedoor 天気 API (横浜)</Text>
        </TouchableHighlight>
      </View>
    );
  },
  _onPress1: function() {
    this.props.navigator.push({
      title: "Test Data",
      component: TestDataList,
      passProps: {url: "http://betahikaru.com/testdata.json"}
    });
  },
  _onPress2: function() {
    this.props.navigator.push({
      title: "Yokohama Tenki",
      component: WeatherList,
      passProps: {url: "http://weather.livedoor.com/forecast/webservice/json/v1?city=140010"}
      // http://weather.livedoor.com/weather_hacks/webservice
    });
  },
});

var WeatherList = React.createClass({
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
        dataSource: ds.cloneWithRows(responseData.forecasts),
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
          <View style={styles.listRow}>
            <Text style={styles.listText}>
              {rowData.dateLabel} {rowData.telop}
            </Text>
            <Image
              style={{
                width: rowData.image.width,
                height: rowData.image.height,
              }}
              source={{uri: rowData.image.url}}
            />
          </View>
        }
        style={styles.listView}
      />
    );
  }
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
  touchable: {
    height: 60,
    backgroundColor: '#F5FCAA',
  },
  instructions: {
    fontFamily: 'Hiragino Kaku Gothic ProN',
    textAlign: 'center',
    color: '#333333',
  },
  listView: {
  },
  listRow: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    height: 60,
  },
  listText: {
    fontFamily: 'Hiragino Kaku Gothic ProN',
  },
});

AppRegistry.registerComponent('RouterTest', () => RouterTest);
