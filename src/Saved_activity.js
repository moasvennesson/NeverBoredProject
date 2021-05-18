import React from 'react'

export default function Saved_activity(props) {
    console.log(props.id);

    return (
        <li className="list-group-item">
            {props.activity}
            <button className="btn btn-sm btn-danger float-end" onClick={() => {props.deleteItem(props.id)}}>X</button>
        </li>
    )
}
