import instance from "..";
// 登录
export function loginAPI(data){
    return instance({
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
        method: 'get',
    })
}
// 获取短信验证码
export function getCaptcha(phone){
    return instance({
        method: 'get',
        url: `/captcha/sent?phone=${phone}`
    })
}
// 验证短信验证码
export function verifyCaptcha(data){
    return instance({
        method: 'get',
        url: `/captcha/verify?phone=${data.phone}&captcha=${data.captcha}`
    })
}