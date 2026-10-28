import React, { Children, createContext, useEffect, useState } from 'react'
export const DataContainer = createContext()

export default function MyContext({children}) {
     const[theme,setTheme]=useState(
      localStorage.getItem('Mode')|| 'dark')
    
useEffect(()=>{
localStorage.setItem("Mode",theme)
document.documentElement.setAttribute("data-theme",theme)
},[theme])


  return (
    <DataContainer.Provider value={{theme,setTheme}}>
{children}
    </DataContainer.Provider>
  )
}
