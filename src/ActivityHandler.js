import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';
import Activities from './Activities';
import './style.css';
import Saved_activity from './Saved_activity';

//"http://www.boredapi.com/api/activity/"


export default function ActivityHandler() {
    const [activity, Set_activity] = useState([]);
    const [new_activities, Set_new_activities] = useState([]);
    const CategoryRef = useRef();
    const PeopleRef = useRef();
    // [...activity, { id: uuidv4(), activity: response.data.activity, type: response.data.type }]

    function Get_activity(){
        const category = CategoryRef.current.value
        const people = PeopleRef.current.value
        Axios.get(`http://www.boredapi.com/api/activity?type=${category}&participants=${people}`).then((response) => {
           // console.log(category);
           let myarray = [response.data.activity, response.data.participants]
            Set_activity(myarray)
            //console.log(response.data.participants)
            }
        )
        
    };
        //console.log(activity)
          //  console.log(new_activities);
      function Save_activity(activity, inputRefRating) {
              console.log(inputRefRating.current.value);
              Set_new_activities([...new_activities, { id: uuidv4(), activity: activity, rating: inputRefRating.current.value}])

          }

    function deleteItem(id) {
        Set_new_activities(new_activities.filter((activity) => activity.id !== id));
    }

    function updateItem(id, activity, rating) {
        // Ska uppdatera en item i listan
    }

    return (
        <div className="container">
             <h1>Never bored</h1>
            <section id="buttons">
                <select ref={CategoryRef} type="text" className="form-control">
                    <option value="0">Chose your category here...</option>
                    <option value="">random</option>
                    <option value="education">education</option>
                    <option value="recreational">recreational</option>
                    <option value="social">social</option>
                    <option value="diy">diy</option>
                    <option value="charity">charity</option>
                    <option value="cooking">cooking</option>
                    <option value="relaxation">relaxation</option>
                    <option value="music">music</option>
                    <option value="busywork">busywork</option>
                </select>
                <select ref={PeopleRef} type="text" className="form-control">
                    <option value="0">How many participants?</option>
                    <option value="">random</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="8">8</option>
                </select>
                <button className="btn btn-success mt-3" onClick={Get_activity}>Get Activity</button>
                <h3 style={{paddingTop: "20px"}}>Activities:</h3>
                <ul className="list-group">
                    <Activities key={uuidv4()} activity={activity} Save_activity={Save_activity} /> 
                </ul>
                <h3>Saved activities:</h3>
                <ul className="list-group">
                    {new_activities.map(activity => <Saved_activity deleteItem={deleteItem} updateItem={updateItem} activity={activity.activity} rating={activity.rating} id={activity.id} key={uuidv4()}/>)}
                </ul>
            </section>
        </div>
    )
}
