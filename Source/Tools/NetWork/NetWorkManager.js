/**
 * Created by zhuzihao on 2017/11/28.
 */
import {Subject,Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import { HttpMethod ,HttpRequestOption} from "./Http"
import { InterceptorManager } from "./Interceptor";
import { ResponseResultActionManager } from "./ResponseResultAction"


export class NetWorkManager {
    /**
     *      JSON
     *
     *  url   string
     *  method HttpMethod
     *  return  Observable ResponseResult
     * */
    static  NetWork(url,method,body,header){
        return Observable.create((obs)=>{
            let options = new HttpRequestOption(url,method,body,header);
            InterceptorManager.MapInterceptor(options,(ops,sub)=>{
                fetch(ops.url,ops).then(response => {
                    sub.next(response);
                    sub.complete();

                    //这里默认处理为Json
                    //可以修改
                    return response.json();
                })
                    .then(json=>{
                        let result = ResponseResultActionManager.MapResponseAction(options,json);
                        if(result.error == null){
                            obs.next(result);
                            obs.complete();
                        }else{
                            obs.error(result.error);
                            sub.error(result.error);
                        }
                    }).catch(err=>{
                    obs.error(err);
                    sub.error(err);
                })
            });
        });
    }
    static  GET(url,body,header){
        return NetWorkManager.NetWork(url,HttpMethod.GET,body,header);
    }
    static  POST(url,body,header){
        return NetWorkManager.NetWork(url,HttpMethod.POST,body,header);
    }
}


export class NetWorkResult{}