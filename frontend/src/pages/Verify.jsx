import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const {navigate, token, setCartItems, backendURL} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verfiyPayment = async () => {
        try {
            if(!token) return null
            const res = await axios.post(backendURL + '/api/order/verifyStripe', {success, orderId}, {headers:{token}})
            if(res.data.success){
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verfiyPayment()
    }, [token])

  return (
    <div>
      
    </div>
  )
}

export default Verify
