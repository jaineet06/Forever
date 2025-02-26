import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const[paymentMethods, setPaymentMethods]  = useState('cod')
  const {navigate, backendURL, token, cartItems, setCartItems, getTotalAmount, delivery_fee, products} = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({...data, [name]: value}))
  } 

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      
      let orderItems = []

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalAmount() + delivery_fee
      }
      
      switch(paymentMethods){

        //Api call for cod
        case 'cod' :
        const res = await axios.post(backendURL + '/api/order/place', orderData, {
          headers: {
            token
          }
        })
        
        if(res.data.success){
          setCartItems({})
          navigate('/orders')
        }else{
          toast.error(res.data.message)
        }
        break;

        case 'stripe':
          const resStripe = await axios.post(backendURL + '/api/order/stripe', orderData, {headers:{token}})
          if(resStripe.data.success){
            const {session_url} = resStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(resStripe.data.message)
          }
          break;

        default:
          break;
      }
      

    } catch (error) {
      console.error("Order validation error: ", error);
      toast.error(error.response.data.message || "Order validation failed.");  
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>


      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name'/>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address'/>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="tel" placeholder='Phone number'/>
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='street'/>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Zipcode'/>
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
        </div>
      </div>


      {/* Right side */}
      <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal/>
          </div>

          {/* Payment Methods */}
          <div className='mt-12'>
            <Title text1={"PAYMENT"} text2={"METHODS"}/>
            <div className='flex flex-col lg:flex-row gap-3'>
              <div  onClick={()=>setPaymentMethods('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethods === 'stripe' ? 'bg-green-500' : ''}`}></p>
                <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
              </div>
              <div className='flex items-center gap-3 border p-2 px-3 opacity-50 cursor-not-allowed'>
                <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
                <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
              </div>
              <div onClick={()=>setPaymentMethods('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethods === 'cod' ? 'bg-green-500' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>


            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
          </div>

      </div>

    </form>
  )
}

export default PlaceOrder
