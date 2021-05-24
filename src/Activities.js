import React, { useRef } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoney from '@material-ui/icons/AttachMoney';


export default  function Activities(props) {
    const inputRefRating = useRef();
    console.log(props);
    const activity = props.activity;
    return (
        <li className="list-group-item">
            <p class="fontsizes" style={{fontSize:"25px"}}>{activity[0]}</p>
            <br/>
            <PeopleIcon/> {activity[1]}
            <br/>
            <AttachMoney/> {activity[2]}
            <button className="btn btn-secondary float-end" onClick={() => {props.Save_activity(props.activity, inputRefRating)}}>Save</button>
            <select ref={inputRefRating} type="text" id="ratingform" className="form-control">
                <option value="0">Select rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </li>
    )
}
