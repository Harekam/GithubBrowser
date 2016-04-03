/**
 * Created by harekamsingh on 4/3/16.
 */
'use strict';
import React, {
    Component,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS
} from 'react-native';
import AuthService from './AuthService';
import Login from './Login';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            isLoggedOut: false
        };
    }

    render() {

        if (this.state.isLoggedOut) {
            return (<Login/>);
        }
        return (
            <View style={styles.container}>

                <TouchableHighlight
                    onPress={this.onLogoutPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableHighlight>
                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                />
            </View>
        );
    }

    onLogoutPressed() {
        this.setState({showProgress: true});
        new AuthService().removeAuthService((err)=> {
            if (!err) {
                this.setState({isLoggedOut: true, showProgress: false});
            }
        })

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        fontSize: 18,
        padding: 4,
        borderWidth: 1,
        borderColor: "#48bbec"
    },
    button: {
        height: 50,
        backgroundColor: "#48BBEC",
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: "#FFF",
        alignSelf: 'center'
    }
});
export default  Settings;