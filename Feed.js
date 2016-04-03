/**
 * Created by harekamsingh on 4/3/16.
 */
'use strict';

import React, {
    Component,
    Text,
    View,
    Image,
    ListView,
    ActivityIndicatorIOS,
    TouchableHighlight
} from 'react-native';
import AuthService from './AuthService';
import DetailsRepo from './DetailsRepo';
import moment from 'moment';
class Feed extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2)=>r1 != r2
        });
        this.state = {
            showProgress: true,
            dataSource: ds
        };
    }

    pressRow(rowData) {
        this.props.navigator.push({
            title: 'Details',
            component: DetailsRepo,
            passProps: {
                repoDetails: rowData
            }
        });
    }

    renderRow(rowData) {

        return (
            <TouchableHighlight
                onPress={()=>this.pressRow(rowData)}
                underlayColor="#ddd"
            >
                <View style={{
                     flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
            }}>
                    <Image
                        source={{uri: rowData.owner.avatar_url}}
                        style={{
                        height: 36,
                        width: 36,
                        borderRadius: 18
                    }}
                    />
                    <View style={{
                paddingLeft:20
                }}>
                        <Text style={{backgroundColor:'#fff'}}>last update {moment(rowData.updated_at).fromNow()}</Text>
                        <Text style={{backgroundColor:'#fff'}}> {rowData.name}</Text>
                        <Text style={{backgroundColor:'#fff'}}> {rowData.language}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    componentDidMount() {
        this.fetchFeed();
    }

    fetchFeed() {
        new AuthService().getAuthInfo((err, authInfo)=> {
            let url = 'https://api.github.com/users/' + authInfo.user.login + '/repos';
            fetch(url, {
                headers: authInfo.header
            })
                .then((response)=> {
                    console.log("response", response);
                    return response.json();
                })
                .then((responseData)=> {
                    console.log("response data", responseData);
                    // let feedItems = responseData.filter((ev)=>ev.type == 'PushEvent');
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseData),
                        showProgress: false
                    });
                }).catch((err) => {
                console.log(err);
            })

        })
    }

    render() {
        if (this.state.showProgress) {
            return ( <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicatorIOS
                    size="large"
                    animating={true}/>
            </View>);
        }
        return (
            <View style={{
           flex: 1,
            justifyContent: 'flex-start'
        }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}
export default Feed;
