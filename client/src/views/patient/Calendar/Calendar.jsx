import React, { useState } from "react";
import { DateTimePicker } from '@material-ui/pickers';

export default function CalendarFunction(){
    const [date, setDate] = useState(new Date());

    const handleChange = (date) =>{
        setDate(date);
    };

    return(
        <DateTimePicker onChange={handleChange} value={date}/>
    );
};