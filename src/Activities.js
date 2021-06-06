import React, { useRef } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoney from '@material-ui/icons/AttachMoney';
import './style.css';


export default  function Activities(props) {
    const inputRefRating = useRef();
    const activity = props.activity;
    return (
        <>
        <div id="activitycontainer">
            <p class="fontsizes" style={{fontSize:"25px"}}>{activity[0]}</p>
            <div id="flex">
                <div className="symbols">
                    <p style={{margin:"0",display:"inline",float:"left"}}><AttachMoney/> {activity[2] * 10}</p>
                    <p style={{margin:"0",display:"inline", marginLeft:"10px"}}><PeopleIcon/> {activity[1]} </p>
                </div>
                <div id="ratingAndButton">
                    <button className="btn btn-secondary float-end" onClick={() => {props.Save_activity(props.activity, inputRefRating)}}>Save</button>
                    <select ref={inputRefRating} type="text" id="ratingform" className="form-control">
                        <option value="0">Select rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
        </div>

    </>
    )
}
