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
import moment from 'moment';
class DetailsRepo extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2)=>r1 != r2
        });
        this.state = {
            dataSource: ds,
            showProgress: true,
            repoDetails: this.props.repoDetails
        };
    }

    render() {
        return (
            <View style={{
            flex:1,
            paddingTop:80,
            justifyContent:'flex-start',
            alignItems:'center'
            }}>
                <Image source={{uri:this.state.repoDetails.owner.avatar_url}}
                       style={{
                height:120,
                width:120,
                borderRadius:60
                }}
                />
                <Text style={{paddingTop:20, paddingBottom:20,fontSize:20}}>
                    {moment(this.state.repoDetails.created_at).fromNow()}
                </Text>
                <Text><Text style={{fontWeight: 'bold'}}>{this.state.repoDetails.name}</Text> written in</Text>
                <Text style={{fontWeight: 'bold'}}>{this.state.repoDetails.language}</Text>
                <Text>Default branch
                    <Text style={{fontWeight: 'bold'}}> {this.state.repoDetails.default_branch}
                    </Text>
                </Text>
            </View>
        );
    }
}
export default DetailsRepo;
