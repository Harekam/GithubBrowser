'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight
} from 'react-native';
import SearchResults from './SearchResults';

class Search extends Component {
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
                <TextInput style={styles.input}
                           onChangeText={(text)=>this.setState({searchQuery:text})}
                           placeholder="Search Query"/>
                <TouchableHighlight
                    onPress={this.onSearchPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>

            </View>
        );
    }

    onSearchPressed() {
        console.log("searching", this.state.searchQuery);
        this.props.navigator.push({
            title: 'Results',
            component: SearchResults,
            passProps: {
                searchQuery: this.state.searchQuery
            }
        });
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

export default Search;