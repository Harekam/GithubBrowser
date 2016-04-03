'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image
} from 'react-native';
import AuthService from './AuthService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false
        };
    }

    render() {
        let errorCtrl = <View/>;
        if (!this.state.isSuccess && this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>
                The username and password combination did not work
            </Text>
        }
        if (!this.state.isSuccess && this.state.unknownError) {
            errorCtrl = <Text style={styles.error}>
                Unexpected issue occurred
            </Text>
        }
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('image!Octocat')}/>
                <Text style={styles.heading}>Github Browser</Text>
                <TextInput style={styles.input}
                           onChangeText={(text)=>this.setState({username:text})}
                           placeholder="Github username"/>
                <TextInput style={styles.input}
                           onChangeText={(text)=>this.setState({password:text})}
                           placeholder="Github password" secureTextEntry={true}/>
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>

                {errorCtrl}

                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                />
            </View>
        );
    }

    onLoginPressed() {
        console.log("attempting to login with username", this.state.username);
        this.setState({showProgress: true});
        new AuthService().login({
            username: this.state.username,
            password: this.state.password
        }, (results)=> {
            this.setState(Object.assign({showProgress: false}, results));
            if (results.isSuccess && this.props.onLogin) {
                this.props.onLogin();
            }
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
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
    },
    loader: {
        marginTop: 10
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

export default Login;