import React, { useEffect, useState } from 'react'
import { useApi } from '../context/ApiContext'
import { fetchUser } from '../utils/api'

const Testing = () => {

  const {showMenu,setShowMenu} = useApi()
  let [count , setcount] = useState(0)
 const incCount  = ()=>{
// console.log('==>',count)
      setcount(++count)
 }
 
    return (
       <>
       <div className='colo text-white text-4xl'>
        {count}
       </div>
       <button  className =" bg-gray-400" onClick={incCount} >count inc</button>
       </>
    )
}

export default Testing
