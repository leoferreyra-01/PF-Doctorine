// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
// const localizer = momentLocalizer(moment) // or globalizeLocalizer
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const locales = {
  'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

// const appointment = [
//   {}
// ]


export default function Appointments(){
  return(
    <Calendar localizer={localizer} style={{height: 500, margin: '50px'}}></Calendar>
  )
}
// const Calendar = (props) => (
//   <div className="myCustomHeight">
//     <Calendar
//       localizer={localizer}
//       events={myEventsList}
//       startAccessor="start"
//       endAccessor="end"
//     />
//   </div>
// )
