import React, {useState, useRef} from 'react';
import Activities from './Activities'

export default function Request() {
    const [activities, setState] = useState([])

    fetch('http://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(json => {
        setState({
            activities: json,
            isLoaded: true, 
        })
    }).catch((err) => {
        console.log(err);
    });
    

    function randomActivity() {
        return (
            console.log(activities)
        )
    } 
        

    return (
        <div className="container">
            <section id="buttons">
                <button type="button" className="btn btn-primary" id="firstbutton" onClick={randomActivity}>Random activity</button>
            </section>
        </div>
    );

}

