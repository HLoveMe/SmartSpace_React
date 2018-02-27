
import { BehaviorSubject } from 'rxjs/Rx';
export class UserInfo{

}

class _UserInfoManager{
    userSubject = null;
    constructor() {
        this.userSubject = new BehaviorSubject(null);
    }
}
export const UserInfoManager = new _UserInfoManager();
