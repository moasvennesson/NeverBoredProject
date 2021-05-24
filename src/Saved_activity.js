import React from 'react'
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoney from '@material-ui/icons/AttachMoney';

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Saved_activity(props) {
    console.log(props.id);
    const rating = parseInt(props.rating);

    const checkValueStars = (object, value) => {
        console.log(object);
        console.log(value);
    }
    //console.log(props.activity);
    return (
        <>
            <h3>Saved activities</h3>
            <li className="list-group-item" id="items">
                <font size="+2">{props.activity[0]}</font>
                <button className="btn btn-sm btn-danger float-end" onClick={() => {props.deleteItem(props.id)}}>X</button>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend"></Typography>
                    <Rating
                    name="customized-icons"
                    defaultValue={rating}
                    getLabelText={(value) => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                    onChange={checkValueStars}
                    />
                </Box>
                <PeopleIcon/> {props.activity[1]}
                <br/>
                <AttachMoney/> {props.activity[2]}
            </li>
        </>
    )
}
