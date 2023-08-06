import axios from "../utils/request";

export const $insertActivity = async (insertInfo) => {
    let {data} = await axios.post('insertActivity', insertInfo)
    return data;
}
