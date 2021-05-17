import React from 'react'

export default function Activities(props) {
  console.log(props);
  return (
    <li className="list-group-item">
      { props.activity}
    </li>
  )
}
