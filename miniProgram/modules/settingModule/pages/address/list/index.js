// /modules/settingModule/pages/address/list/index.js
import { reqGetAddressList, reqDeleteAddress } from '@/api/address'
import { swipeCellBehavior } from '@/behaviors/swipCell'
Page({
  behaviors: [swipeCellBehavior],
  // 页面的初始数据
  data: {
    addressList: []
  },

  // 删除收货地址
  async delAddress(event) {
    const { id } = event.currentTarget.dataset
    // 确认用户是否删除
    const modalRes = await wx.modal({
      content: '您确认要删除该收货地址吗?'
    })

    // 如果用户确认删除,那么返回值是true
    if (modalRes) {
      // 调用对应的删除接口将收货地址进行删除
      await reqDeleteAddress(id)
      wx.toast({ title: '删除收货地址成功' })
      this.getAddressList()
    }
  },

  // 去编辑页面
  toEdit(event) {
    console.log(event)
    const { id } = event.currentTarget.dataset
    console.log(id)
    wx.navigateTo({
      url: `/modules/settingModule/pages/address/add/index?id=${id}`
    })
  },

  // onLoad是在页面加载时触发,如果当前页面没有销毁,onLoad 钩子函数只会执行一次
  // 如果点击了新增,编辑,不会销毁当前页面然后进行新增,编辑页面
  // 在新增,编辑以后,返回到列表页面,这时候 onLoad 不会触发执行,就不会获取最新的数据
  async onShow() {
    this.getAddressList()
  },
  async getAddressList() {
    // 下面这个操作的意思是把data从响应里面结构出来, 然后重命名为addressList
    const { data: addressList } = await reqGetAddressList()
    // console.log(res)

    // key和value同名的话,可以只写key就行
    this.setData({
      addressList
    })
  }
})
