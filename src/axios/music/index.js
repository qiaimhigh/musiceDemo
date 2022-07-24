import instance from "..";
export function getMusicList(id){
    return instance({
        method: 'get',
        url: '/playlist/detail?id='+id
    })
}
export function getMusicLists(id,offest = 0){
    return instance({
        method: 'get',
        url: `/playlist/track/all?id=${id}&limit=20&offset=${offest}`
    })
}

// 获取歌词
export function getLyric(id){
    return instance({
        method: 'get',
        url:`/lyric?id=${id}`
    })
}   