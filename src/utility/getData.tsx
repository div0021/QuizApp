

import axios from 'axios'
const getData =async ()=>{
    return await axios.get('https://restcountries.com/v3.1/all');
}

export default getData;