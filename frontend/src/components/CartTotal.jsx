import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
   const{currency, delivery_fee, getTotalAmount} = useContext(ShopContext)


  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={"YOUR"} text2={"TOTAL"}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text:sm'>
        <div className='flex justify-between'>
            <p>SubTotal</p>
            <p>{currency}{getTotalAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping fee</p>
            <p>{currency}{getTotalAmount() === 0 ? 0 : delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Total</p>
            <p>{currency}{getTotalAmount() === 0 ? 0 : getTotalAmount() + delivery_fee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
