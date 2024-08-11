import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {
    const [name,setName] = useState('');
    const [data,setData] = useState([]);
    const [error,setError] = useState();

useEffect(() => {
console.log(data,"Data")
},[data])
const getData = (dataToChange) => {
    console.log(dataToChange, "to change");

    // Extract and accumulate conceptProperties arrays
    const newData = dataToChange
        .map((d) => d.conceptProperties || []) // Extract conceptProperties or empty array if not present
        .flat(); // Flatten the array of arrays into a single array



    // Update the state with the new data
    setData(newData)
};


 
    function handleClick() {
        setError('')
         axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${name}`)
         .then(res =>{ 
            console.log(res,"res1");
            if(!res.data.drugGroup.hasOwnProperty('conceptGroup')) {
              
                axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${name}`).then(res => {
                    console.log(res.data.suggestionGroup.suggestionList.hasOwnProperty('suggestion') ,"Property")
                    if(res.data.suggestionGroup.suggestionList.hasOwnProperty('suggestion')) {
                        axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${res.data.suggestionGroup.suggestionList.suggestion}`)
                        .then(res => {
                            getData(res.data.drugGroup.conceptGroup)
                        })
                        
                    }
                    else {
                        setData([]);
                        setError("Opps! Nothing Matching the given input could be found")
                    }
                })
            }
            else {
                getData(res.data.drugGroup.conceptGroup)
                // setData(res.data.drugGroup.conceptGroup)
            }
            
            
            })
         .catch(e => console.log(e,"error"))
         .finally(setName(''))
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
      
            handleClick()
        }
    };
  return (
    <div className='homePage'>
        <div>
      <input name='name' placeholder='Enter drug name to search' onChange={(e) => setName(e.target.value)} value={name}  onKeyDown={handleKeyDown} />
      <button onClick={handleClick}>Search</button>
      </div>
      {data.length>0  && 
      <div className='results'>
           {data.map((nameData,index) => {
            
      return  <Link to= {`/drug/${nameData.name}` } state={nameData}  key={index}> <p>{nameData.name}</p></Link>
      })}
      
      </div>
      
}
{error && <h1>{error}</h1>}
    </div>
  )
}

export default Home
