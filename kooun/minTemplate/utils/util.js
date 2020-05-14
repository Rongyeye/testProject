var common = {
    /**
     * 获取明天后一周的日期（7月12日  ）
     * @returns {Array}
     */
    getWeek() {
        let week = [];
        for (let i = 0; i < 7; i++) {
            let Stamp = new Date();
            let num = 1 + i;
            Stamp.setDate(Stamp.getDate() + num);
            week[i] = (Stamp.getMonth() + 1) + '月' + Stamp.getDate() + '日';
        }
        return week;
    },

    /**
     * 获取明天后一周的日期 (周五 7月12日)
     * @returns {*|Array}
     */
    getOneWeek() {
        let week = common.getWeek(), date = new Date(),
            weekIndex = 1, secondDay = date.getDay() + 1;  //从明天开始
        if (secondDay == 7) {
            week[0] = "周" + "日一二三四五六".charAt(0) + ' ' + week[0];
        } else if (secondDay < 7) {
            week[0] = "周" + "日一二三四五六".charAt(secondDay) + ' ' + week[0];
        }
        for (let i = 1; i < 7; i++) {
            let nextDay = secondDay + i;
            if (nextDay == 7) {
                week[i] = "周" + "日一二三四五六".charAt(0) + ' ' + week[i];
            } else if (nextDay < 7) {
                week[i] = "周" + "日一二三四五六".charAt(nextDay) + ' ' + week[i];

            } else if (nextDay > 7) {
                week[i] = "周" + "日一二三四五六".charAt(weekIndex) + ' ' + week[i];
                weekIndex = weekIndex + 1;
            }
        }
        return week;
    },

    /**
     * 返回明天后一周的日期（2018-01-10...2018-01-16）
     * @returns {Array}
     */
    getDate() {
        let week = [];
        for (let i = 0; i < 7; i++) {
            let d = new Date();
            let num = 1 + i, date = d.getDate() + num, month = d.getMonth() + 1, year = d.getFullYear();
            month = month < 10 ? '0' + month : month;
            date = date < 10 ? '0' + date : date;

            d.setDate(date);
            week[i] = year + '-' + month + '-' + date;
        }
        return week;
    },

    /**
     * 按照字母或某个字段过滤
     * @param data  需要处理的data
     * @param arrs  暂时存放的数组
     * @param map   数组中的每个对象
     * @returns {*} 返回处理结果
     */
    selectLetter(data, arrs, map) {
        let arr = data;
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];  //数组中的每一项数据

            if (!map[ai.initial]) {  //如果map 中没有某个字母
                arrs.push({
                    initial: ai.initial,
                    data: [ai]
                });
                map[ai.initial] = ai;  //字母分隔的那一项数据
            } else {
                for (var j = 0; j < arrs.length; j++) {
                    var dj = arrs[j];
                    if (ai.initial == dj.initial) {
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        return arrs;
    },

    /**
     * 过滤数组中的重复项
     * @param array  需要过滤的数组
     * @returns {Array}  返回过滤后的数据
     */
    arrFilter(array) {
        var arr = [];
        for (var i = 0; i < array.length; i++) {
            if (arr.indexOf(array[i]) == -1) {
                arr.push(array[i]);
            }
        }
        return arr;
    },

    /** js 浮点陷阱
     * parseFloat(1.4000000000000001.toPrecision(12)) === 1.4  // True
     * @param num
     * @param precision
     * @returns {number}
     */
    strip(num) {
        return +parseFloat(num.toPrecision(12));
    },

    /**
     * 时间戳转为yyyy-mm-dd hh:mm:ss, 传入参数为时间戳
     * @param timeStamp
     */
    timeStamp(timeStamp) {
        let date = new Date();
        date.setTime(timeStamp);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;

    },

}

export {
    common
}

