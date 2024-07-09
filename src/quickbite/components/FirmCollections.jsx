import React, { useEffect, useState } from 'react'
import { API_URL } from '../api'
import { Link } from 'react-router-dom'
import { MagnifyingGlass } from 'react-loader-spinner'

const FirmCollections = () => {

    const [firmData,setFirmData]=useState([])
    const [selectedFilter,setSelectedFilter]=useState("All")
    const [activeButton,setActiveButton]=useState('All')
    const [loading,setLoading]=useState(true)

    const firmDataHandler=async()=>{
        try {
        const response=await fetch(`${API_URL}/vendor/allVendorFirms`)
        const responseData=await response.json()
        setFirmData(responseData.vendor)
        setLoading(false)
        
        } catch (error) {
            console.log(error)
            setLoading(true)
            alert("Failed to fetch the data")
            
        }
    }

    useEffect(()=>{
        firmDataHandler()
    },[])

    const filterHandler=(region,selected)=>{
      setSelectedFilter(region)
      setActiveButton(selected)
    }
  return (
    <>
    <h3>Restaurants with online food delivery in Srikakulam</h3>
    <div className="filterButtons">

      <button onClick={()=>{filterHandler("All","All")}} className={activeButton==='All'?'btnActive':''}>All</button>
      <button onClick={()=>{filterHandler("south-indian","south-indian")}} className={activeButton==='south-indian'?'btnActive':''}>South Indian</button>
      <button onClick={()=>{filterHandler("north-indian","north-indian")}} className={activeButton==='north-indian'?'btnActive':''}>North Indian</button>
      <button onClick={()=>{filterHandler("chinese","chinese")}} className={activeButton==='chinese'?'btnActive':''}>Chinese</button>
      <button onClick={()=>{filterHandler("bakery","bakery")}} className={activeButton==='bakery'?'btnActive':''}>Bakery</button>
    </div>
    <div className="loadingSpinner">

{loading &&
<>
Restaurants Searching...
<MagnifyingGlass
visible={true}
height="80"
width="80"
ariaLabel="magnifying-glass-loading"
wrapperStyle={{}}
wrapperClass="magnifying-glass-wrapper"
glassColor="white"
color="orange"
/>
</>
}
</div>
    <section className='firmSection'>
      {firmData.map((vendors)=>{
        return vendors.firm.map((item)=>{
          if(selectedFilter==="All" || item.region.includes(selectedFilter))
          {
              return(
                <Link to={`products/${item._id}/${item.firmName}`} className='link'>
                <div className="firmGroupBox">
                  <div className='firmGroup'>
                      <img src={`${API_URL}/uploads/${item.image}`} />
                      <div className="firmOffer">{item.offer}</div>
                  </div>
                  <div className="firmDetails">
                  <strong>{item.firmName}</strong>
                  <div className='firmArea'>{item.region.join(', ')}</div>
                  <div className='firmArea'>{item.area}</div>
                    
                  </div>
                  </div>
                  </Link>    
              )
          }
        })
        return null

      })}
    </section>
    </>
    
  )
}

export default FirmCollections
