import Mock from 'mockjs'
import homeApi from "../mock/index2.js"
export default Mock.mock('/api/home/getData',
homeApi.getStatisticalData
)