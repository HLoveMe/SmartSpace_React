
import { BehaviorSubject ,Observable} from 'rxjs/Rx';
import {NetWorkManager} from "../../Tools/NetWork/NetWorkManager"
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

    setAttributes = (attrs)=>{
        for(var name in attrs){
            this[name] = attrs[name]
        }
    }
}

class _UserInfoManager{
    user = null;
    userSubject = null;
    UserKey = "UserKeyForUSer";
    constructor() {
        this.userSubject = new BehaviorSubject("Init");
    }
    //加载本地数据
    loadLocationData=()=>{
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
    registerUser=(mobile,code,password)=>{
        return Observable.create((obs)=>{
            debugger
            NetWorkManager.POST("sys/register",{mobile,code,password}).subscribe((res)=>{
                obs.next(res.success);
                obs.complete()
            },()=>{
                obs.next(false);
                obs.complete()
            });
        })
    };
    loginUser = (mobile,password)=>{
        return Observable.create((obs)=>{
            NetWorkManager.POST("sys/login",{mobile,password}).subscribe((res)=>{
                if(res.success){//result
                    this.user = new UserInfo();
                    this.user.setAttributes(res.result);
                    this.userSubject.next(this.user);
                    this.saveUser();
                    this.loadAllInfo();
                }
                obs.next(res.success);
                obs.complete();
            },()=>{
                obs.next(false);
                obs.complete()
            })
        })
    };
    loginOut = ()=>{

    };
    loadAllInfo = ()=>{
        //加载数据
        NetWorkManager.POST("user/info").subscribe((res)=>{
            if(res.success){
                let result = res.result;
                this.user.setAttributes(result);
                this.saveUser();
                this.userSubject.next(this.user);
            }
        })
    };
    saveUser =()=>{
        storage.save({
            key:this.UserKey,
            data:this.user
        })
    };
    clearUser = ()=>{
        storage.remove({
            key:this.UserKey
        })
    }

}
export const UserInfoManager = new _UserInfoManager();
