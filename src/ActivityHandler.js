import React, { useState, useRef } from 'react';
import Axios from 'axios';
import Activities from './Activities';
//"http://www.boredapi.com/api/activity/"

export default function ActivityHandler() {
    const [activity, set_activity] = useState()
    const get_activity = () => {
        Axios.get("http://www.boredapi.com/api/activity/").then((response) => {
            console.log(response);
            set_activity(response.data.activity)
        }
        );
    };

    function save_activity(event) {
        const [new_activities, Set_new_activities] = useState([]);

        Set_new_activities(new_activities => {
            console.log(event.target.dataset.mssg);
            return [...new_activities, {activity: event.target.dataset.mssg}]
        })
        /*
            Detta under fungerar, men skriver över allt som finns i listan
            const new_activity = []
            console.log(event.target.dataset.mssg);
            return [...new_activity, {activity: event.target.dataset.mssg}]

        */
    }

    return (
        <div>
            {activity}
            <section id="buttons">
                <button className="btn btn-success mt-3" onClick={get_activity}>Activity</button>
                <button className="btn btn-success mt-3" data-mssg={activity} onClick={save_activity}>Save</button>
            </section>
        </div>
    )
}
