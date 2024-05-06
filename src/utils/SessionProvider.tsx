'use client'
import React from "react"
import { SessionProvider } from "next-auth/react"

const AuthProvider=({Children}:any)=>{
    return <SessionProvider>{Children}</SessionProvider>
}
export default AuthProvider