import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
const Drug = () => {
    const params = useParams();
    const location = useLocation();
    const state = location.state || {};

  return (
    <div className='drugPage'>
         <h1> Name of the Drug: {state.name}</h1>
         <h2>ID: {state.rxcui}</h2>
         <p>Synonims: {state.synonym}</p>
    </div>
  )
}

export default Drug
