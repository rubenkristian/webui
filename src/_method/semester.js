import {config} from './config';

async function list({index, rows, search, sortby, sort}, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(
            config.getUrlParams(
                `${config.endpoint}/semester`, 
                {page: index, search: search, sortby: sortby, sort: sort, rows: rows}
                ),
            config.getconfig())
        let json = await response.json()
        if(response.status == 200){
            result.json = json.response
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

async function lightsrc(search, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(
            config.getUrlParams(
                `${config.endpoint}/semester/light`, 
                {search: search}
                ),
            config.getconfig())
        let json = await response.json()
        if(response.status == 200){
            result.json = json.response
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

async function insert(data, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(`${config.endpoint}/semester`, config.postdataconfig(data))
        let json = await response.json()
        if(response.status == 200){
            result.json = json.data
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

async function del(id, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(`${config.endpoint}/semester`, config.deletedataconfig({id: id}))
        let json = await response.json()
        if(response.status == 200){
            result.json = json.data
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

async function update(data, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(`${config.endpoint}/semester`, config.putdataconfig(data))
        let json = await response.json()
        if(response.status == 200){
            result.json = json.data
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

export const semester = {
    list,
    insert,
    del,
    update,
    lightsrc
}
