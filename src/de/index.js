import copy from "./copy"
const deli={
    copy,
}
export default{
    install(Vue){
        console.log(1);
        Object.keys(deli).forEach((k)=>{
            Vue.directive(k,deli[k])
        })
    }
}