import React, { useEffect, useState } from 'react'
import { API_URL } from '../api'
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { MagnifyingGlass } from 'react-loader-spinner'

const Chains = () => {
    const [vendorData,setVendorData]=useState([])
    const [scrollPosition,setScrollPosition]=useState(0)
    const [loading,setLoading]=useState(true)
    const vendorFirmHandler=async ()=>{
        try {

            const response=await fetch(`${API_URL}/vendor/allVendorFirms`)
            const responseData=await response.json()
            setVendorData(responseData)
            console.log(responseData)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            alert("Failed to fetch Data")
            setLoading(true)
        }
    }
    useEffect(()=>{
        vendorFirmHandler()
    },[])

    const scrollHandler=(direction)=>{
      const gallery=document.getElementById("chainGallery")
      const scrollAmount=500

      if(direction==='left'){
        gallery.scrollTo({
          left:gallery.scrollLeft-scrollAmount,
          behavior:'smooth'
        })

      }
      else if(direction==='right'){
        gallery.scrollTo({
        left:gallery.scrollLeft+scrollAmount,
        behavior:'smooth'
      })
      }
    }
  return (
    <>
    <div className="buttonSection">
      <button onClick={()=>{scrollHandler('left')}}>
        <FaArrowAltCircleLeft className='btnIcons'/>
      </button>
      <button onClick={()=>{scrollHandler('right')}}>
        <FaArrowAltCircleRight className='btnIcons'/>
      </button>
    </div>
    <h3>Top restaurant chains in Srikakulam</h3>

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
    <section className="chainSection" id='chainGallery' onScroll={(e)=>setScrollPosition(e.target.scrollLeft)}>
      
      {vendorData.vendor && vendorData.vendor.map((vendors)=>{
          return(
            <>
            <div className='vendorBox'>
              {vendors.firm.map((item)=>{
                return(
                <>
                <div className="firmImage">
                  <img src={`${API_URL}/uploads/${item.image}`} />
                </div>
                </>
                )
              })}
            </div>
            </>
          )
      })}

    </section>
    </>
    
  )
}

export default Chains
