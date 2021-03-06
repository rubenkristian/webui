import {study} from '../_method'

export const studies = {
    namespaced: true,
    state: {
        listItems: [],
        classItems: [],
        error: null,
        totalItems: 0,
        loading: false,
        upload: false,
        dialog: false,
        lightSearch: []
    },
    actions: {
        storeReq({commit}, {index, rows, search, sortby, sort}){
            commit('removeError')
            commit('setLoading', true)
            study.list({index: index, rows: rows, search: search, sortby: sortby, sort: sort}, (result)=>{
                const {err, json} = result;
                setTimeout(()=>{
                    if(err){
                        commit('setError', err)
                    }else{
                        commit('addAll', {items: json.table, len: json.len})
                    }
                    commit('setLoading', false)
                }, 100)
            })
        },
        searchLight({commit}, search){
            study.lightsrc(search, (result)=>{
                const {json} = result
                setTimeout(()=>{
                    commit('addLightData', json)
                },100)
            });
        },
        uploadStudy({commit}, {data}) {
            commit('removeError')
            commit('setLoading', true)
            commit('setUpload', true)
            study.insert(data, (result)=>{
                const {err, json} = result;
                if(err){
                    commit('setError', err)
                    commit('setUpload', true)
                }else{
                    if(json){
                        commit('setUpload', false)
                        commit('setDialog', false)
                    }
                }
            })
            commit('setLoading', false)
        },
        updateStudy({commit}, {data}){
            commit('removeError')
            commit('setLoading', true)
            commit('setUpload', true)
            study.update(data, (result)=>{
                const {err, json} = result;
                if(err){
                    commit('setError', err)
                    commit('setUpload', true)
                }else{
                    if(json){
                        commit('setUpload', false)
                        commit('setDialog', false)
                    }
                }
            })
            commit('setLoading', false)
        },
        updateItems({commit}, {id, items}){
            commit('updateItems', {id, items})
        },
        deleteItems({commit}, {id}){
            commit('deleteItems', {id})
        },
        deleteStudy({commit}, {id}){
            commit('removeError')
            commit('setLoading', true)
            commit('setUpload', true)
            study.del(id, result=>{
                const {err, json} = result
                if(err){
                    commit('setError', err)
                    commit('setUpload', true)
                }else{
                    if(json){
                        commit('setUpload', false)
                    }
                }
            })
            commit('setLoading', false)
        },
        storeClass({commit}){
            window.$cookies.remove('clsmod')
            if(window.$cookies.isKey('clsmod')){
                const list = window.$cookies.get('clsmod')
                commit('setClass', list)
                return
            }
            study.classList(result=>{
                const {err, json} = result
                if(err){
                    commit('setError', err)
                }else{
                    if(json){
                        commit('setClass', json)
                    }
                }
            })
        },
        removeError({commit}){
            commit('setError', null)
        },
        openDialog({commit}){
            commit('setDialog', true)
        },
        closeDialog({commit}){
            commit('setDialog', false)
        }
    },
    getters: {
        getAllItems(state){
            return state.listItems
        },
        getLoading(state){
            return state.loading
        },
        getLenItems(state){
            return state.totalItems
        },
        getStatUpload(state){
            return state.upload
        },
        getError(state){
            return state.error
        },
        getDialog(state){
            return state.dialog
        },
        getClassList(state){
            return state.classItems
        },
        getLightResult(state){
            return state.lightSearch
        }
    },
    mutations: {
        setClass(state, items){
            state.classItems = JSON.parse(items)
            if(!window.$cookies.isKey('clsmod')){
                window.$cookies.set('clsmod', items, 60 * 60 * 24 * 30)
            }
        },
        setPagination (state, payload) {
            state.pagination = payload
        },
        setLoading(state, stat){
            state.loading = stat
        },
        setDialog(state, stat){
            state.dialog = stat
        },
        setError(state, err){
            state.error = err
        },
        removeError(state){
            state.error = null
        },
        addLightData(state, items){
            state.lightSearch = items
        },
        addAll(state, {items, len}){
            state.listItems = items
            state.totalItems = len
        },
        setUpload(state, val){
            state.upload = val
        },
        clear(state){
            state.listItems = []
            state.lengthItems = 0
        },
        addItems(state, {item}){
            state.listItems.push(item)
        },
        updateItems(state, {id, items}){
            state.listItems.find( (item, index) => {
                if(item.id === id){
                    state.listItems[index] = items
                }
            })
        },
        deleteItems(state, {id}){
            state.listItems.find((item, index)=>{
                if(item.id === id){
                    delete state.listItems[index]
                }
            })
        }
    }
}