import axios from 'axios'

const login = async credentials => { 
    console.log(credentials)
    const {data} = await axios.post("/login" , credentials)
    return data
} 

let token = null 
const setToken = newToken => { 
    token = `Bearer ${newToken}`
}
let token2 = JSON.parse(window.localStorage.getItem("loggedToken"))







export default { login , setToken }