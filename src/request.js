
import userEvent from '@testing-library/user-event';
import React, {useState, useRef} from 'react';

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
        
    if (activities.isLoaded = false)
        return <div>Loading...</div>;

    return (
        <div className="container">
            <section id="buttons">
                <button type="button" className="btn btn-primary" id="firstbutton" onClick={randomActivity}>Random activity</button>
            </section>
        </div>
    );

}

