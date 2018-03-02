/**
 * Created by zhuzihao on 2018/3/1.
 */
import {APPLoginRouter} from "../../../Pages/AppRouter"
import {Types} from "../../AppTypes"
import { NavigationActions } from 'react-navigation';

const initState = APPLoginRouter.router.getStateForAction(APPLoginRouter.router.getActionForPathAndParams('login'));

export  function AccountReducer(state = initState,action) {
    let nextState;
    switch (action.type){
        case Types.AccountTypes.login:
            break
        case Types.AccountTypes.register:
            nextState = APPLoginRouter.router.getStateForAction(NavigationActions.navigate({routeName:action.type,params:action}),state);
            break
        default:
            nextState = APPLoginRouter.router.getStateForAction(action,state);
    }
    return nextState || state;
}