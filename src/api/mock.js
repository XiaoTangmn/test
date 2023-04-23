import Mock from 'mockjs'
import homeApi from "../mock/index2.js"
import userApi from "../mock/user.js"
import permission from './permission.js'
Mock.mock('/api/home/getData',
homeApi.getStatisticalData
)
Mock.mock('/api/user/add','post',
userApi.createUser
)
Mock.mock('/api/user/edit','post',
userApi.updateUser
)
Mock.mock('/api/user/del','post',
userApi.deleteUser
)
Mock.mock(/api\/user\/getUser/,
userApi.getUserList
)
// 传递数据的接口类型一般是post
Mock.mock(/api\/permission\/getMenu/,"post",
permission.getMenu
)
