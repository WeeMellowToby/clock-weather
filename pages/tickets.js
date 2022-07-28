import React, { useEffect } from 'react'
import { useRouter } from "next/router"
import Login from "./components/Login"
import { getTickets } from '../tickets/ticketCount'
export default function Tickets({ hasReadPermission }) {
    useEffect(() => {
        if (!hasReadPermission) {
            getTickets(console.log)
        }
    }, [])
    const router = useRouter()
    if (!hasReadPermission) {
        return <Login redirectPath={router.asPath} />
      }
  return (
    <div >
        
    </div>
  )
}
