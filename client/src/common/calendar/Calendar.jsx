import React, { useState } from "react";
import { DateTimePicker } from '@material-ui/pickers';
import { useDispatch } from "react-redux";
import { postTurn } from "../../redux/actions.js";

export default function CalendarFunction(){
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();

    const handleChange = (date) =>{
        setDate(date);
    };

    const handleClick = (date) =>{
        dispatch(postTurn(date))
    };

    return(
        <DateTimePicker onChange={handleChange} value={date} onClick={handleClick}/>
    );
};