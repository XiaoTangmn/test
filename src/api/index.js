import http from '../Utils/request'

export const getData = () =>{
    //第一个是后端给的接口,2:配置，返回一个Promise
    return http.get('/home/getData')
}
// 返回用户列表
export const getUser = (params) =>{
    console.log(params,"params user");
    //第一个是后端给的接口,2:配置，返回一个Promise
    return http.get('/user/getUser',params)
}
export const addUser = (data) =>{
    //第一个是后端给的接口,2:配置，返回一个Promise
    console.log(data,'add data');
    return http.post('/user/add',data)
}
export const editUser = (data) =>{
    //第一个是后端给的接口,2:配置，返回一个Promise
    return http.post('/user/edit',data)
}
export const delUser = (data) =>{
    //第一个是后端给的接口,2:配置，返回一个Promise
    return http.post('/user/del',data)
}
export const getMenu = (data) =>{
    //第一个是后端给的接口,2:配置，返回一个Promise
    return http.post('/permission/getMenu',data)
}

