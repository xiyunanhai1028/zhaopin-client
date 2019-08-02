/**
 * Created by flyTigger on 2019/8/1.
 */
import axios from "axios"

export default function ajax(url, data = {}, type = "GET") {
    if (type === "GET") {
        let paramsStr = "";
        Object.keys(data).forEach(key => {
            paramsStr += key + "=" + data[key] + "&"
        })
        if (paramsStr) {
            paramsStr.substring(0, paramsStr.length - 1)
            return axios.get(url + "?" + paramsStr)
        } else {
            return axios.get(url)
        }
    } else if (type === "POST") {
        return axios.post(url, data)
    }
}