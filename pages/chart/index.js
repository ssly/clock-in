import api from '../../common/api/index'

const nowTime = new Date();
const nowYear = nowTime.getFullYear();
const nowMonth = nowTime.getMonth() + 1;
const nowDate = `${nowYear}-${nowMonth}`;
const getFirstDayWeek = function(year, month) {
  let day = new Date(`${year}/${month}/1`).getDay();
  console.log("[chart] 选择月份的第一天是星期：" + day);
  return day;
}

const getDayNum = function(year, month) {
  let dayNum = 0;
  switch (month) {
    case 2:
      year%4 !==0 ? dayNum = 29 : dayNum = 28;
      break
    case 4:
    case 6: 
    case 9:
    case 11:
      dayNum = 30;
      break
    default:
      dayNum = 31;
  }
  console.log("[chart] 本月的天数为: ", dayNum);
  return dayNum;
}

Page({
  data: {
    fulfilled: false, // 是否拉去数据成功
    nowDate,
    dateList: [],
    firstDayWeek: getFirstDayWeek(nowYear, nowMonth),
    weekList: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  },
  // 查找列表
  getList (value) {
    api.sport.getList(value).then(res => {
      console.log("[chart] getList, ", res);
      if (res.code !== 0 || res.code === undefined) {
        console.log("[chart] getlist error");
        let dateArr = this.data.nowDate.split("-");
        let dayNum = getDayNum(parseInt(dateArr[0]), parseInt(dateArr[1]));
        let firstDayWeek = getFirstDayWeek(dateArr[0], dateArr[1]);
        let dateList = [];
        for (let j = 0; j < firstDayWeek; j++) {
          let dateObj = {
            date: "",
            isPunch: false
          };
          dateList.push(dateObj);
        }
        for(let i = 0; i < dayNum; i++) {
          let dateObj = {
            date: i + 1,
            isPunch: false,
          };
          dateList.push(dateObj);
        }
        this.setData({
          fulfilled: true,
          dateList,
        })
        return;
      }
      console.log("[chart] this.data.firstDayWeek: ", this.data.firstDayWeek);
      for(let i = 0; i < this.data.firstDayWeek; i++) {
        res.data.unshift({
          date: "",
          isPunch: false,
        })
      }
      this.setData({
        fulfilled: true,
        dateList: res.data,
      })
    })
  },
  bindDateChange: function (e) {
    console.log('[chart] picker发送选择改变，携带值为', e.detail.value);
    let changeTimeArr = e.detail.value.split("-");
    let changeFirstDayWeek = getFirstDayWeek(changeTimeArr[0], changeTimeArr[1]);

    this.setData({
      nowDate: e.detail.value,
      firstDayWeek: changeFirstDayWeek,
      nowDate: e.detail.value,
    }, () => {
      this.getList({
        year: changeTimeArr[0],
        month: changeTimeArr[1],
      });
    });
  },
  onShow: function () {
    console.log('[chart] page onShow');
    this.data.getFirstDayWeek = getFirstDayWeek(nowYear, nowMonth);
    this.getList({
      year: nowYear,
      month: nowMonth,
    });
  },
  onReady: function() {
    console.log("[chart] page onReady");
  }
})
