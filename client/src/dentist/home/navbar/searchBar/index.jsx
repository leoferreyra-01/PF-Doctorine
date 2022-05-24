import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { searchPatient } from '../../redux/actions';


export default function SearchBar() {
  // const [id, setId] = useState("");
  // const dispatch = useDispatch();

  // function handleChange(e) {
  //   setId(e.target.value)
  // }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('BUSCA PACIENTE')

    // if(id.length){
    // //   dispatch(searchPatient(id));
    //   console.log(id)
    //   setId('');
    // } else{
    //   alert('Please, insert a valid identification number')
    // }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="DNI"  />
        {/* value={id} onChange={handleChange} */}
        <input type="submit" value="Search" />
      </div>
    </form>
  );
}