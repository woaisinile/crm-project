import axios from "../utils/request";

// 登录
export const $login = async (params) => {
    let {data} = await axios.get('login', {params})
    return data;
}
