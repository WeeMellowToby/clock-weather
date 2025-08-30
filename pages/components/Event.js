import Link from 'next/link';
import React, { useState } from 'react'
import { SetEvent } from '../api/firebase';

export default function Event(props) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        lat: props.lat,
        lon: props.lon,
        wunderground: props.wunderground
    });
    const [original, setOriginal] = useState(form);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setOriginal(form);
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
        SetEvent(props.name, form.lat, form.lon, form.wunderground)
    };

    const handleUndo = () => {
        setForm(original);
        setEditing(false);
    };

    return (
        <div className='bg-gray-400 w-160 p-2 rounded-md mb-2'>
            {editing ? (
                <>
                    <div>
                        <label>
                            URL: <Link href={"clock-weather.vercel.app/events/" + props.name}><u>clock-weather.vercel.app/events/{form.name}/</u></Link>
                        </label>
                    </div>
                    <ul>
                        <li>
                            Latitude: <input name="lat" value={form.lat} onChange={handleChange} />
                        </li>
                        <li>
                            Longitude: <input name="lon" value={form.lon} onChange={handleChange} />
                        </li>
                        <li>
                            Wunderground ID: <input name="wunderground" value={form.wunderground} onChange={handleChange} />
                        </li>
                    </ul>
                    <button onClick={handleSave} className='bg-blue-500 text-white rounded-md w-fit p-2'>Save</button>
                    <button onClick={handleUndo} className='bg-blue-500 text-white rounded-md w-fit p-2'>Undo</button>
                </>
            ) : (
                <>
                    <h2>
                        URL: <Link href={"clock-weather.vercel.app/events/" + form.name} ><u>clock-weather.vercel.app/events/{props.name}/</u></Link>
                    </h2>
                    <ul>
                        <li>Latitude: {form.lat}</li>
                        <li>Longitude: {form.lon}</li>
                        <li>Wunderground ID: {form.wunderground}</li>
                    </ul>
                    <button onClick={handleEdit} className='bg-blue-500 text-white rounded-md w-fit p-2'>Edit</button>
                </>
            )}
        </div>
    )
}
