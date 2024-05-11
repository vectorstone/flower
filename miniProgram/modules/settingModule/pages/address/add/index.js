// 从async-validator 中引入构造函数
import Schema from 'async-validator'

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
  async saveAddrssForm() {
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
    // 对组织以后的参数进行验证,验证通过以后,需要调用新增接口实现新增收货地址的功能
    // 将验证结果里面的 valid 属性解构出来
    const { valid } = await this.validatorAddress(params)

    // 如果 valid 等于 false,说明验证失败,就不执行后续的逻辑
    if (!valid) return
    // 如果valid 等于 true,说明验证成功调用新增的接口实现新增收货地址功能
    console.log('验证成功', params)
  },

  validatorAddress(params) {
    console.log('dddddddddd')
    // 包含大小写字母,或数字,或中文字符
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\u9fa5]+$'
    // 验证手机号需要符合中国大陆手机号码的格式
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'
    // 创建验证规则
    // 定义验证规则
    const rules = {
      // key 验证规则的名字,名字需要和验证的数据保持一致
      name: [
        { required: true, message: 'name 不能为空' },
        { pattern: nameRegExp, message: '姓名必须包含字母或数字或中文汉字' }
      ],
      phone: [
        { required: true, message: 'phone 不能为空' },
        { pattern: phoneReg, message: '非法的手机号,请重新输入' }
      ],
      provinceName: { required: true, message: '请选择收货人所在地区' },
      address: { required: true, message: '请输入详细地址' }
    }

    const validator = new Schema(rules)

    // 我们希望将验证结果通过 Promise 的形式返回给函数的调用者
    return new Promise((resolve) => {
      validator.validate(params, (errors) => {
        if (errors) {
          wx.toast({ title: errors[0].message })
          // 如果验证失败,则返回valid属性,值为 false
          resolve({ valid: false })
        } else {
          // 如果验证成功,则返回valid属性,值为 true
          resolve({ valid: true })
        }
      })
    })
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
