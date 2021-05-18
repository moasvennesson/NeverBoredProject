import React from 'react';

export default function Activities(props) {
    //console.log(props);
    const activity = props.activity;
    return (
        <li className="list-group-item">
            {activity}
            <button className="btn btn-success mt-3 float-end" onClick={() => {props.Save_activity(props.activity)}}>Save</button>
        </li>
    )
}
