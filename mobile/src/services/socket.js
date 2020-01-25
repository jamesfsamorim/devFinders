import socketio from 'socket.io-client'
import { SERVER_URL } from "../utils/constants";

const socket = socketio(SERVER_URL, {
    autoConnect: false
})

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction)
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = { latitude, longitude, techs }

    socket.connect(latitude, longitude, techs)
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}