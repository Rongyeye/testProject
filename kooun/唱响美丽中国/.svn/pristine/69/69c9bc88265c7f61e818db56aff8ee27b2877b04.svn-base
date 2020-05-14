import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({
  data: {
    gengduo3:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS84MDA3ODAzZjk1MDY1YWU4MDBkY2NmNjI4Y2U2NWUxLm82ekFKc3ducTZUc0QxQ095eDFrMU93ZFROalUubjlvSmZCSE1mQzB5MDgwMDc4MDNmOTUwNjVhZTgwMGRjY2Y2MjhjZTY1ZTEucG5n',
    icon3:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS80ZjQ3YzI0YzZlNzU0MWExOTVlY2FkMDI5MTg5YmE5NC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmNicmg2TUNaa2NhNTRmNDdjMjRjNmU3NTQxYTE5NWVjYWQwMjkxODliYTk0LnBuZw==',
    curProvinceIndex: -1,  //当前点击的省下标，用于province[curProvinceIndex]
    curCityIndex: '',  //当前点击的市下标
    flag: 0,
    currentTab: 0,

    cityID: 0,
    cPageStart:1,
    cPageCount: 0,
    cpageTotal: 0,
    cityPaging: false, //标志是否需要加载下一页

    provinceId:0,//省ID
    pPageStart: 1,
    pPageCount:0,
    pPageTotal:0,
    provincePaging: false, //标志是否需要加载下一页
   

    //省列表地址&&实例
    province:[
      // {
      //   "zipcode": "100000",  //邮政编码
      //   "parentname": "",
      //   "depth": "1",
      //   "name": "北京",
      //   "id": 1,
      //   "areacode": "010",
      //   "parentid": 0
      // },
    ],
    //市列表地址&&实例
    city: [
    //   {
    //   "zipcode": "510000",  //邮政编码
    //   "depth": "2",
    //   "name": "广州",
    //   "id": 75,
    //   "areacode": "020",
    //   "parentid": 5
    // },
    ],
  },


  //跳转到XclassificationFilter
  switchclassify:function(e){
    console.log(e)
      wx.navigateTo({
        url: '/pages/XclassificationFilter/XclassificationFilter'
      })
  },




//
switchNavB:function(e){
  var ida = e.currentTarget.id
  this.setData({
    // currentTab: ida, //currentTab用于显示触碰省时对应的市列表
    flag: ida,
    curProvinceIndex:-1,
    city:[]   //让city制空
  });
},

//不同省    右侧的市列表显示
  switchNav: function (e) {
    console.log(e);
    let that = this;
    var ida = e.currentTarget.dataset.index //得到触碰“省”时的id，赋值为ida（怕与province中的id冲突）

    that.setData({
      curProvinceIndex: e.currentTarget.dataset.index,
      provinceId: this.data.province[ida].id,  //根据ida获得省的id，为了后面的city获取传值
    })
    that.setData({
      flag: -1
    });
  
    that.getCityList(1, that.data.provinceId);
  },

//获得市的列表
  getCityList: function (cPageStart,provinceId) {
    let that = this;
    // console.log(curProvinceIndex)
    wxRequest('/homePage/getCityList', { pageStart: cPageStart, provinceId:this.data.provinceId}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        let arr = that.data.city;
        if(cPageStart==1){
          arr = [];
          that.setData({
            cityPaging: false,
            cPageStart:1,   //重置为第一页
          })
        }
        let mydata = res.data.result.data;
        // console.log(mydata)
        if (mydata.length < res.data.result.pageTotal) {
          that.setData({
            cityPaging: false,
            city: arr.concat(mydata)
          });
        } else {
          that.setData({
            cityPaging: true,
            cPageStart: that.data.cPageStart + 1,
            city: arr.concat(mydata)
          });
        }
      } else {
        tips.confirm(res.data.message);
      }
  });
},
//获得省列表
  getProvinceList: function (pPageStart) {
    let that = this;
    // console.log(curProvinceIndex)
    wxRequest('/homePage/getProvinceList', {pageStart:pPageStart}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        let arr = that.data.province;
        if (pPageStart == 1) {  //是否为第一页？是的话就清空arr中的数据
          arr = [];
          that.setData({
            provincePaging: false,
            pPageStart: 1,   //重置为第一页
          })
        }
        let mydata = res.data.result.data;
        // console.log(mydata)
        if (mydata.length < res.data.result.pageTotal) {
          that.setData({
            provincePaging: false,
            province: arr.concat(mydata)
          });


        } else {
          that.setData({
            provincePaging: true,
            pPageStart: that.data.pPageStart + 1,
            province: arr.concat(mydata),

          });
        }
        console.log(that.data.province)
      } else {
        tips.confirm(res.data.message);
      }
    });
  },

  //选择市时：
  selectCity: function (e) {
    console.log(e)
    let that = this;
    // var id = e.currentTarget.id;
    let cityIndex = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/XnearbySinging/XnearbySinging?area=' + that.data.province[that.data.curProvinceIndex].name + that.data.city[cityIndex].name + 'flag=' + 0 + 'type=1'
    })
  },

  lowerMoreProvince:function(e){
    if (this.data.provincePaging) {
      this.getProvinceList(this.data.pPageStart)
    }
  },

//触底时
  lowerMoreCity: function () {
    if (this.data.cityPaging) {
      this.getCityList(this.data.cPageStart, this.data.cityID)
    }
  },







/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProvinceList(this.data.pPageStart)

  },

})