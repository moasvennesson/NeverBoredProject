import React, { useRef } from 'react';

export default function Activities(props) {
    const inputRefRating = useRef();
    //console.log(props);
    const activity = props.activity;
    return (
        <li className="list-group-item">
            {activity}
            <select ref={inputRefRating} type="text" id="ratingform" className="form-control">
                <option value="0">Välj betyg här...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button id="hej" className="btn btn-secondary float-end" onClick={() => {props.Save_activity(props.activity, inputRefRating)}}>Save</button>
        </li>
    )
}
