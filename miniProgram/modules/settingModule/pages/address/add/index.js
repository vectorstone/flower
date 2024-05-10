Page({
  // 页面的初始数据
  data: {
    // 需要将请求参数放到 data 对象下,方便在模板中绑定数据
    name: '', // 收货人
    phone: '', // 手机号码
    provinceName: '', // 省
    provinceCode: '', // 省编码
    cityName: '', // 市
    cityCode: '', // 市编码
    districtName: '', // 区
    districtCode: '', // 市编码
    address: '', // 详细地址
    fullAddress: '', // 完整地址
    isDefault: false // 是否设置为默认地址,如果为0 不设置为默认地址,如果为1 设置为默认地址
  },

  // 保存收货地址
  saveAddrssForm() {
    // 需要拼接完整的地址以及转换isDefualt属性
    const {
      provinceName,
      cityNam,
      districtName,
      address,
      isDefault
    } = this.data
    const params = {
      ...this.data,
      fullAddress: provinceName + cityNam + districtName + address,
      isDefault: isDefault ? 1 : 0
    }
    console.log(params)
  },

  // 省市区选择
  onAddressChange(event) {
    console.log(event)
    const [districtName, cityName, provinceName] = event.detail.value
    const [districtCode, cityCode, provinceCode] = event.detail.code
    this.setData({
      districtName,
      cityName,
      provinceName,
      districtCode,
      cityCode,
      provinceCode
    })
  }
})
