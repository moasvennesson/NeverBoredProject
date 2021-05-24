import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';
import Activities from './Activities';
import './style.css';
import Saved_activity from './Saved_activity';


//"http://www.boredapi.com/api/activity/"


export default function ActivityHandler() {
    const [activity, Set_activity] = useState([]);
    const [new_activities, Set_new_activities] = useState([]);
    const saved_activities = get_activities_from_local_storage();
    const CategoryRef = useRef();
    const PeopleRef = useRef();
    const PriceRef = useRef();




    // [...activity, { id: uuidv4(), activity: response.data.activity, type: response.data.type }]

    function Get_activity(value){
        const category = CategoryRef.current.value
        const people = PeopleRef.current.value
        const moneyvar = PriceRef.current.value.split(",")
        const moneyMin = moneyvar[0];
        const moneyMax = moneyvar[1];

        Axios.get(`http://www.boredapi.com/api/activity?type=${category}&participants=${people}&minprice=${moneyMin}&maxprice=${moneyMax}`).then((response) => {
           // console.log(category);
        Set_activity([response.data.activity, response.data.participants, response.data.price])
            //console.log(response.data.participants)
        })
    };

    function Show_element() {
        Get_activity();
        let x = document.getElementById("toggle_div");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
    }

    function get_activities_from_local_storage() {
        console.log("Local_storage körs");
        let local_data = localStorage.getItem("activities");
        console.log(local_data);

        if(local_data) {
            return JSON.parse(local_data)

        } else {
            return [];
        }
    }
        //console.log(activity)
          //  console.log(new_activities);
    function Save_activity(activity, inputRefRating) {
        let new_activity = {id: uuidv4(), activity: activity, rating: inputRefRating.current.value}
        let local_data = get_activities_from_local_storage();
        local_data.push(new_activity)
        console.log("Här sparas den nya listan", local_data);

        localStorage.setItem("activities", JSON.stringify(local_data));
        Set_new_activities(local_data);
    }

    function deleteItem(id) {
        let activity_list = get_activities_from_local_storage();
        let activities = activity_list.filter((activity) => activity.id !== id);
        localStorage.setItem("activities", JSON.stringify(activities));
        Set_new_activities(new_activities.filter((activity) => activity.id !== id));
    }

    function rating_sort() {
        let sortedRating = saved_activities.sort(function(a, b){
            return b.rating - a.rating
          });
          localStorage.setItem('activities', JSON.stringify(sortedRating));
          window.location.reload();
    }

    function updateItem(id, activity, rating) {
        // Ska uppdatera en item i listan
    }
    // {activity.map(activity => <Activities key={uuidv4()} activity={activity} Save_activity={Save_activity} />)}
    console.log(activity);
    console.log(saved_activities);
    return (
        <div className="container">
             <h1>Never bored</h1>
            <section id="buttons">
                <b>Select activity</b>
                <select ref={CategoryRef} type="text" className="form-control">
                    <option value="">Select category here...</option>
                    <option value="">Random</option>
                    <option value="education">Education</option>
                    <option value="recreational">Recreational</option>
                    <option value="social">Social</option>
                    <option value="diy">Diy</option>
                    <option value="charity">Charity</option>
                    <option value="cooking">Cooking</option>
                    <option value="relaxation">Relaxation</option>
                    <option value="music">Music</option>
                    <option value="busywork">Busywork</option>
                </select>
                <b>Select participants</b>
                <select ref={PeopleRef} type="text" className="form-control">
                    <option value="">Select number of participants...</option>
                    <option value="">Random</option>
                    <option value="1" >1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="8">8</option>
                </select>
                <b>Price range</b>
                <select ref={PriceRef} type="text" className="form-control" id="div1">
                    <option value="0,1">Select price range...</option>
                    <option value='0,1'>Random</option>
                    <option value='0,0.1' >Low</option>
                    <option value='0.11,0.5'>Medium</option>
                    <option value='0.51,1'>High</option>
                </select>
                <button className="btn btn-success mt-3" onClick={Show_element}>Get Activity</button>
                <div style={{display: "none"}} id="toggle_div">
                    <h3 style={{paddingTop: "20px"}}>Activity</h3>
                    <ul className="list-group">
                        <Activities key={uuidv4()} activity={activity} Save_activity={Save_activity} />
                    </ul>
                </div>
                <div id="toggle_button">
                    <h3 id="saved_h3">Saved activities</h3>
                    <button type="button" className="btn btn-primary" onClick={rating_sort}>Sort by rating</button>
                </div>
                <ul className="list-group" id="activity_list">
                    {saved_activities.map(activity => <Saved_activity deleteItem={deleteItem} updateItem={updateItem} activity={activity.activity} rating={activity.rating} id={activity.id} price={activity.price} key={uuidv4()}/>)}
                </ul>
            </section>
        </div>
    )
}
