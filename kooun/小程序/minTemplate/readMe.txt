components:  

自定义组件 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/

index:  首页

discover: 发现  

manage:  管家

person: 个人中心
{
   addrManage: 地址管理
   cardPack: 卡券
   changeName: 修改姓名
   changePhone: 修改手机号
   perIndex:  个人中心页
   personalInfo:  个人基本信息
   wallet:  钱包
}


order: 订单相关
{
   order:  订单列表页
   orderDetail: 订单详情页
}

style: 样式文件
{
   base: 公共样式
   style: 公共样式
   orderStyle: 类似订单列表的样式(其他样式文件)
}

utils: 工具文件
{
   tip: 提示(loading, toast, comfirm, ...)
   util: 基本数据处理的工具
   wxRequest:  网络请求 (使用: 见perIndex.js 文件 --- getPersonalInfo()方法)
}

分页:  pages/order/order.js, 方法: getOrder()

