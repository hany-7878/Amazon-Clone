import React, { useContext, useEffect } from 'react'
import Routering from './Router'
import { DataContext } from './Components/DataProvider/DataProvider'
import { type } from './Utility/action.type'
import { auth } from './Utility/firebase'


function App() {
  const [{user}, dispatch] =useContext(DataContext)

  useEffect(() =>{
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        dispatch({
          type:type.SET_USER,
          user:authUser
        })
      }else{
        dispatch({
          type:type.SET_USER,
          user:null,
        })
      }
    })

  }, [])

  return (
    <>
    <Routering/>
    
    </>
  )
}

export default App
