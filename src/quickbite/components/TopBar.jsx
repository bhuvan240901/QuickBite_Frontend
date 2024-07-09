import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className='topBar'>
      <div className="companyTitle"><Link to='/' className='link'><h2>QuickBite</h2></Link></div>
      <div className="search"><input type='text' placeholder='Search'/></div>
      <div className="userAuth">Login/Register</div>
    </div>
  )
}

export default TopBar
