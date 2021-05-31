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


    function Get_activity(value){
        const category = CategoryRef.current.value
        const people = PeopleRef.current.value
        const moneyvar = PriceRef.current.value.split(",")
        const moneyMin = moneyvar[0];
        const moneyMax = moneyvar[1];

        Axios.get(`http://www.boredapi.com/api/activity?type=${category}&participants=${people}&minprice=${moneyMin}&maxprice=${moneyMax}`)
        .then((response) => {
            Set_activity([response.data.activity, response.data.participants, response.data.price, response.data.error])
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.response.data)
        })
    };

    useEffect(async () => {
        document.getElementById("toggle_div").style.display = "none";
        if(activity.length === 0){
            console.log(activity);
        } else {
            return Show_activity_from_API();
        }
    });

    function Show_activity_from_API() {
        let x = document.getElementById("toggle_div");
        if (activity[3] === undefined) {
            x.style.display = "block";
        }  else {
            x.style.display = "none";
            alert("We cannot and shall not meet your demands");
        }
    }

    useEffect(async () => {
        document.getElementById("toggle_saved_activities").style.display = "none";
        return await Promise.all(saved_activities.map(Show_activity_from_localstorage));
    });

    function Show_activity_from_localstorage() {
        let x = document.getElementById("toggle_saved_activities");

        if (saved_activities) {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    function get_activities_from_local_storage() {
        console.log("Local_storage körs");
        let local_data = localStorage.getItem("activities");

        if(local_data) {
            return JSON.parse(local_data)

        } else {
            return [];
        }
    }

    function Save_activity(activity, inputRefRating) {
        let test = {
            activity: activity[0],
            participants: activity[1],
            price: activity[2],
            error_msg: activity[3],
            rating: inputRefRating.current.value,
            id: uuidv4()
        }
        console.log(test);

        let new_activity = {
            activity: activity,
            rating: inputRefRating.current.value,
            id: uuidv4()
        }
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
          Set_new_activities(saved_activities);
    }

    function update_new_activity(id, rating, activity) {
        let activity_new_rating = {
            activity: activity,
            rating: rating,
            id: id
        }
        // Removes the old activity from local storage and adds the new list
        let activities = saved_activities.filter((activity) => activity.id !== id);
        localStorage.setItem("activities", JSON.stringify(activities));

        // Gets the local storage and pushes the new activity with the updated rating
        let local_data = get_activities_from_local_storage();
        local_data.push(activity_new_rating)

        // Updates local storage with the new activity
        localStorage.setItem("activities", JSON.stringify(local_data));
        Set_new_activities(local_data);
    }


    return (
        <div className="container">
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
                <button className="btn btn-success mt-3" onClick={Get_activity}>Get Activity</button>
                <a class="btn btn-outline-success mt-3" href="http://www.boredapi.com/contributing" target="_blank" style={{marginLeft: "10px"}}>Contribute</a>
                <div style={{display: "none"}} id="toggle_div">
                    <h3 style={{paddingTop: "20px"}}>Activity</h3>
                    <ul className="list-group">
                        <Activities key={uuidv4()} activity={activity} Save_activity={Save_activity} />
                    </ul>
                </div>
                <div id="toggle_saved_activities" style={{display: "none"}}>
                    <h3 id="saved_h3">Saved activities</h3>
                    <button type="button" className="btn btn-primary" onClick={rating_sort}>Sort by rating</button>
                </div>
                <ul className="list-group" id="activity_list">
                    {saved_activities.map(activity => <Saved_activity updateItem={update_new_activity} deleteItem={deleteItem} activity={activity.activity} rating={activity.rating} id={activity.id} price={activity.price} key={uuidv4()}/>)}
                </ul>
            </section>
        </div>
    )
}
