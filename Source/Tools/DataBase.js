/**
 * Created by zhuzihao on 2018/2/28.
 */

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

export const initStorage = ()=>{
    let storage  = new Storage({
        size:1000,
        storageBackend:AsyncStorage,
        defaultExpires:null,
        enableCache: true
    });
    global.storage = storage;
};