// import React, { useState } from "react";
// import { DateTimePicker } from '@material-ui/pickers';
// import { useDispatch } from "react-redux";
// import { postTurn } from "../../redux/actions.js";
// //import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import Stack from '@mui/material/Stack';

// // export default function DateTimeValidation() {
// //     const [value, setValue] = React.useState(new Date());

// //     return (
// //         <LocalizationProvider dateAdapter={AdapterDateFns}>
// //             <Stack spacing={3}>
// //                 <DateTimePicker
// //                     renderInput={(params) => <TextField {...params} />}
// //                     label="Ignore date and time"


// //                     minDateTime={new Date()}
// //                 />

// //             </Stack>
// //         </LocalizationProvider>
// //     );
// // }





// export default function CalendarFunction() {
//     const [date, setDate] = useState(new Date());
//     const dispatch = useDispatch();

//     const handleChange = (date) => {
//         setDate(date);
//     };

//     const handleClick = (date) => {
//         dispatch(postTurn(date))
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <Stack spacing={3}>
//                 <DateTimePicker
//                     // renderInput={(params) => <TextField {...params} />}
//                     onChange={handleChange}
//                     value={date}
//                     onClick={handleClick}
//                     label='Elige tu próxima cita'
//                     minDateTime={new Date()}
//                 />

//             </Stack>
//         </LocalizationProvider >
//     );
// };