/**
 * Created by harekamsingh on 4/3/16.
 */
'use strict';
import buffer from 'buffer';
import {AsyncStorage} from 'react-native';
const authKey = "auth";
const userKey = "user";
let encoding = require('NativeModules').Encoding;
class AuthService {
    getAuthInfo(callback) {
        AsyncStorage.multiGet([authKey, userKey], (err, val)=> {
            if (err)
                return callback(err);
            if (!val)
                return callback();

            let zippedObj = convertArrayToObject(val);
            console.log("auth service val", zippedObj);
            if (!zippedObj[authKey])
                return callback();
            let authInfo = {
                header: {
                    Authorization: "Basic " + zippedObj[authKey]
                },
                user: JSON.parse(zippedObj[userKey])
            };
            return callback(null, authInfo);
        })
    }

    removeAuthService(callback) {
        AsyncStorage.multiRemove([authKey, userKey], (err)=> {
            if (err) {
                console.log(err);
                return callback(err);
            }
            return callback(null);
        })
    }

    login(credentials, callback) {
        let authStr = credentials.username + ':' + credentials.password;
        encoding.base64Encode(authStr, (encodedAuth)=> {
            fetch('https://api.github.com/user', {
                headers: {
                    Authorization: "Basic " + encodedAuth
                }
            }).then((response)=> {
                if (response.status >= 200 && response.status <= 300)
                    return response;
                throw{
                    badCredentials: response.status == 401,
                    unknownError: response.status != 401
                }
            }).then((response)=> {
                return response.json();
            }).then((results)=> {
                AsyncStorage.multiSet([
                    [authKey, encodedAuth],
                    [userKey, JSON.stringify(results)]
                ], (err)=> {
                    if (err)
                        throw err;

                    return callback({isSuccess: true});
                });
            }).catch((err)=> {
                console.log("login failed", err);
                return callback(err);
            });
        });

    }
}
function convertArrayToObject(array) {
    let len = array.length;
    let obj = {};
    for (let i = 0; i < len; i++) {
        obj[array[i][0]] = array[i][1];
    }
    return obj;
}
export default  AuthService;