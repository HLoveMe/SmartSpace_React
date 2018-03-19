/**
 * Created by zhuzihao on 2018/3/13.
 */


//历史表格数据
class HourMeter{
    num = "";
    meter = 0.0;
}
//上一次数据
class DevideDefaultStatus{
    power = 0.0 // 时时功率
    temp = 0.0 // 时时温度
    meterd = 0.0 //今天电量
    meterm = 0.0 //当月电量
    current = [] //时时电流
    voltage = [] //时时电压
    leakage = 0.0 //漏电流
    created = 0   //数据时间
}
//电价
class PriceItem{
    fee = 0.0 //价格
    meter = 0.0 //电量数
}

class PriceCategory{
    peak = null;//高
    normal = null; //中
    valley = null; //低
}

//Main数据
class MainDevideData{
    id = 0;
    serial_number  = "";
    name = "";
    is_primary = 0;
    status = null; //DevideDefaultStatus
    history = []; //[HourMeter]
    yesterday_fee = 0.0;
    today_fee = 0.0;
    price = 0.0;
    meter_fee = null;//PriceCategory
}



export  class MainElectryInfo{
    title="";
    //电量
    yesterday = 0;
    today = 0;
    //表格数据
    charts = [];
    //电压
    pressure = 0.0;
    electric = 0.0;
    //温度
    temperature = 0.0;
    //漏电
    lostElectric = 0.0;
    //电价 当天就用平时价
    price = 0.0;
    //时间
    time = 0;

    main = null;
    device = null;
    mqtt = null;

    constructor(data,devide,mqtt){
        this.main = data;
        this.device = devide
        this.mqtt = mqtt


        this.title = devide== null ? "时空数码" : devide.name;
        this.price = 0.75

        this.yesterday = data != null ? data.yesterday_fee : 0.0;
        this.today = data != null ? data.today_fee : 0.0;


        if(mqtt == null){
            if(data ==  null){
                //瞎写的
                this.pressure = 0.0
                this.electric = 0.0
                this.temperature = 0.0
                this.lostElectric = 0.0
            }else{
                this.pressure = data.status.voltage.first || 220.0;
                //this.electric = data.status.current.first || 0.0
                this.electric = data.status.power || 0.0
                this.temperature = data.status.temp;
                this.lostElectric = data.status.leakage;
                this.price = data.price;
            }
        }else{
            //mqtt得到电压数据
            this.pressure = 100.0
            this.electric = 10.1
            this.temperature = 30.0
            this.lostElectric = 0.5
        }

        this.time = new Date();
        //表格数据
        if(data != null){
            for (var i = 0 ; i<data.history.length;i++){
                let hour = data.history[i]
                this.charts.push({
                    index:i,
                    xD:hour.num,
                    yD:hour.meter

                });
            }
        }else{this.charts = []}
    }
}

