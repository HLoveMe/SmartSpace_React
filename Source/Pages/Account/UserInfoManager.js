
import { BehaviorSubject } from 'rxjs/Rx';
export class UserInfo{
    user_id = 0;
    iat = 0;
    exp = 0;
    token = "";
    headimgurl = "";
    name = "";
    mobile = "";
    province = 0;
    city = 0;
    district = 0;
    p_name = "";
    c_name = "";
    d_name = "";
    default_equipment = "";
}

class _UserInfoManager{
    user = null;
    userSubject = null;
    UserKey = "UserKeyForUSer";
    constructor() {
        this.userSubject = new BehaviorSubject("Init");
    }
    //加载本地数据
    loadLocationData(){
        storage.load({
            key:this.UserKey
        }).then(res=>{
            this.user = res;
            this.userSubject.next(this.user);
        }).catch((err)=>{
            //没有数据
            this.userSubject.next(null);
        });
    }
}
export const UserInfoManager = new _UserInfoManager();
