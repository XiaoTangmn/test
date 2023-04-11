import http from '../Utils/request'

export const getData = () =>{
    //第一个是后端给的接口,2:配置，返回一个Promise
    return http.get('/home/getData')
}