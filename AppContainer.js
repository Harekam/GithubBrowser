/**
 * Created by harekamsingh on 4/3/16.
 */
'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS
} from 'react-native';
import Feed from './Feed';
import Search from './Search';
import Settings from './Settings';
class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'feed'
        }
    }

    render() {
        return (
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title="Feed"
                    selected={this.state.selectedTab === 'feed'}
                    icon={require('image!inbox')}
                    onPress={()=>this.setState({selectedTab:'feed'})}>
                    <NavigatorIOS
                        style={{
                    flex:1
                    }}
                        initialRoute={{
                        component:Feed,
                        title:'Feed'
                        }}
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    selected={this.state.selectedTab === 'search'}
                    icon={require('image!search')}
                    onPress={()=>this.setState({selectedTab:'search'})}>
                    <NavigatorIOS
                        style={{
                    flex:1
                    }}
                        initialRoute={{
                        component:Search,
                        title:'Search'
                        }}
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Setting"
                    selected={this.state.selectedTab === 'setting'}
                    icon={require('image!inbox')}
                    onPress={()=>this.setState({selectedTab:'setting'})}>
                    <NavigatorIOS
                        style={{
                    flex:1
                    }}
                        initialRoute={{
                        component:Settings,
                        title:'Settings'
                        }}
                    />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}
const styles = StyleSheet.create({
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
    }
});
export default AppContainer;
