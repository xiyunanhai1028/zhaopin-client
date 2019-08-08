/**
 * Created by flyTigger on 2019/8/6.
 */
import io from "socket.io-client"

//链接服务器，获取一个Socket对象
const socket = io("ws://localhost:4000")

//发送消息到服务端
socket.emit("sendMsg", {name: "abc"})

//接收服务端消息
socket.on("receiveMsg", function (data) {
    console.log('浏览器端接收到消息:', data)
})