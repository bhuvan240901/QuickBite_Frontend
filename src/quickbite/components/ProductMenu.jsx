import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../api'
import TopBar from './TopBar'

const ProductMenu = () => {
  const [products,setProducts]=useState([])
  const {firmId,firmName}=useParams()
  const productsHandler=async ()=>{
    try {
    const resposne=await fetch(`${API_URL}/products/${firmId}/products`)
    const responseData=await resposne.json()
    setProducts(responseData.products)
    
      
    } catch (error) {
      console.log(error);
      alert("Failed to fetch Products")
    }
    
  }
  useEffect(()=>{
    window.scrollTo(0, 0);
    productsHandler()
  },[])
  return (
    <>
    <TopBar/>
    <section className='productSection'>
    <h3>{firmName}</h3>
      {products.map((item)=>{
        return(
          
          <div className="productBox">
            <div>
              <div><strong>{item.productName}</strong></div>
              <div className='prodDetails'>{item.price}</div>
              <div className='prodDetails'>{item.description}</div>
            </div>
          <div className='productGroup'>
              <img src={`${API_URL}/uploads/${item.image}`} />
              <div className="addButton">ADD</div>
          </div>

          </div>
        )
      })}
    </section>
    </>
  )
}

export default ProductMenu
