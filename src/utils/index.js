/**
 * Created by flyTigger on 2019/8/5.
 */
export function getRedirectTo(type, header) {
    console.log("type:", type)
    let path = ""
    if (type === "dashen") {
        path = "/dashen";
    } else if (type === "laoban") {//laoban
        path = "/laoban";
    }

    if (!header) {
        path += "info"
    }

    return path

}