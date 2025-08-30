import React, { useEffect, useState, useContext } from 'react'
import { AddEvent, AddUser, getEvents, SignIn } from '../api/firebase'
import Event from '../components/event'
import { UserContext } from '../lib/context'
export default function Events() {
    const { user, userData } = useContext(UserContext)
    const [events, SetEvents] = useState(null)
    useEffect(() => {
        getEvents(SetEvents)
    }, [])
    if (!user) {
        return (<div>
            <button onClick={SignIn}>You are not signed in, please sign in here</button>
        </div>)
    } else if (!userData) {
        const createUser = () => {
            AddUser(user.uid)
        }

        return <button onClick={createUser}>Click to complete sign in</button>
    }
    var eventDisplay = events ? events.map((item) => <Event key={item[0]} lat={item[1].location._lat} lon={item[1].location._long} name={item[0]} wunderground={item[1].wunderground} />) : null
    var createNewEvent = () => {
        AddEvent(0, 0, "wunderground")
    }
    return (
        <div className='ml-5'>
            <h1 className='text-3xl'>Events</h1>
            {eventDisplay}
            <button className='bg-blue-500 text-white rounded-md w-fit p-2 mt-3 ml-2' onClick={createNewEvent}>Add</button>
        </div>
    )
}
