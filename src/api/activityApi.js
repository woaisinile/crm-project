import axios from "../utils/request";

export const $insertActivity = async (insertInfo) => {
    let {data} = await axios.post('insertActivity', insertInfo)
    return data;
}

export const $qryActivityPage = async (qryMap) => {
    let {data} = await axios.post('qryActivityPage', qryMap)
    return data;
}

export const $updateActivity = async (updateInfo) => {
    let {data} = await axios.post('updateActivity', updateInfo)
    return data
}

export const $deleteActivity = async (qryMap) => {
    let {data} = await axios.post('deleteActivity', qryMap)
    return data
}

export const $importActivity = async (qryMap) => {
    let {data} = await axios.post('importActivity', qryMap)
    return data
}

export const $exportActivity = async ()=> {
    let {data} = await axios.get('exportActivity', { responseType: 'blob' })
    return data
}
