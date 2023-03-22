
import { reqListDetail, reqMusic, reqLyric, reqListMusic, getMusicUrl } from '@/api'
const state = {
    currentMusic: JSON.parse(sessionStorage.getItem('currentMusic')) || { id: '', name: '', al: { picUrl: '' } },
    lrc: {},
    currentTime: 0,
    playlist: JSON.parse(sessionStorage.getItem('itemDetail')) || {},
    currentIndex: 0,
    songs: JSON.parse(sessionStorage.getItem('song')) || [],
    duration: 0,
    object: { time: 0 },
    musicUrl: ''
}
const mutations = {
    getMusic(state, { item, index }) {
        state.currentMusic = item;
        state.currentIndex = index
    },
    getLyric(state, lrc) {
        state.lrc = lrc
    },
    updateTime(state, { currentTime, duration }) {
        state.currentTime = currentTime;
        state.object.time = currentTime;
        state.duration = duration;
    },
    reqlist(state, value) {
        state.playlist = value
    },
    getSong(state, value) {
        state.songs = value
    },
    updatePlayList(state, value) {
        state.songs.push(value);
        sessionStorage.setItem('song', JSON.stringify(state.songs));
    },
    getUrl(state, value) {
        state.musicUrl = value
    }
}
const getters = {

}
const actions = {
    changeMusic(context, { item, index }) {
        let id = item.id;
        reqMusic(id).then(res => {
            if (res.data.success == false) {
                alert('歌曲无版权')
            } else if (res.status == 200) {
                context.commit('getMusic', { item, index })
            }
        })
    },
    getLyric(context, id) {
        reqLyric(id).then(res => {
            if (res.status == 200) {
                context.commit('getLyric', res.data.lrc)
            }
        })
    },
    async reqList(context, id) {
        await reqListDetail(id).then(res => {
            if (res.status == 200) {
                sessionStorage.setItem('itemDetail', JSON.stringify(res.data.playlist));
                context.commit('reqlist', res.data.playlist);
                return 'ok'
            } else {
                console.log('fail');
                return Promise.reject(new Error('failure'))
            }
        })
    },
    reqSong(context, id) {
        reqListMusic(id).then(result => {
            if (result.status == 200) {
                sessionStorage.setItem('song', JSON.stringify(result.data.songs));
                context.commit('getSong', result.data.songs)
            }
        })
    },
    requrl(context, id) {
        getMusicUrl(id).then(res => {
            if (res.status == 200) {
                context.commit('getUrl', res.data.data[0].url)
            }
        })
    }
}

export default ({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
})