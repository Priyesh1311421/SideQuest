import React, { useMemo } from 'react'
import {io} from 'socket.io-client'

const socketContext = React.createContext(null)

export const useSocket = ()=>{
    return React.useContext(socketContext)
}

export const SocketProvider = (props)=>{
    const socket = useMemo(
        ()=> 
            io('http://3.109.158.27:8001'),
        []
    )
    return (
        <socketContext.Provider value={{socket}}>
            {props.children}
        </socketContext.Provider>
    )
}