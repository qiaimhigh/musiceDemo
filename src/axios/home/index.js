import instance from "..";
export function getBanners(){
    return instance({
        method: 'get',
        url: '/banner?type=2'
    })
}
export function getMusicList(){
    return instance({
        method: "get",
        url: '/personalized?limit=7'
    })
}