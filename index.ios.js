/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    ActivityIndicatorIOS,
    View
} from 'react-native';
import Login from './Login';
import AuthService from './AuthService';

import AppContainer from './AppContainer';

class GithubBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            checkingAuth: true
        }
    }

    componentDidMount() {
        new AuthService().getAuthInfo((err, authInfo)=> {
            console.log(authInfo);
            this.setState({
                checkingAuth: false,
                isLoggedIn: !!authInfo
            })
        })
    }

    render() {
        if (this.state.checkingAuth) {
            return (
                <View style={styles.container}>
                    <ActivityIndicatorIOS
                        animating={true}
                        size="large"
                        style={styles.loader}
                    />
                </View>);
        }
        if (this.state.isLoggedIn) {
            return (<AppContainer/>);
        }
        return (
            <Login onLogin={this.onLogin.bind(this)}/>
        );
    }

    onLogin() {
        this.setState({isLoggedIn: true});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    loader: {
        marginTop: 10
    }
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
