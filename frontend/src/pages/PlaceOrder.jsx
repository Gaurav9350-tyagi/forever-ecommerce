import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, cartItems, setCartItems, getCartAmount, delivery_fee, products,token } = useContext(ShopContext);

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
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= PLACE ORDER (MOCK) =================
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // const userId = localStorage.getItem("userId");

    // if (!userId) {
    //   toast.error("Please login again");
    //   return;
    // }

    if (!method) {
      toast.error("Please select a payment method");
      return;
    }

    try {
        const userId =localStorage.getItem('userId')
      // Prepare order items
      let orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = structuredClone(
              products.find(product => product._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        //userId,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        address: formData,
        paymentMethod: method.toUpperCase()
      };

      
      const endpointMap = {
        cod: 'place',
        stripe: 'stripe',
        razorpay: 'razorpay'
      };

      const res = await axios.post(
        `${backendUrl}/api/order/${endpointMap[method]}`,
        orderData,
        { headers: {token}}
      );

      if (res.data.success) {
        toast.success(`${method.toUpperCase()} order placed successfully 🎉`, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark"
        });
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error(res.data.message || "Order failed");
      }

    } catch (err) {
      console.error("Place order error:", err.response ? err.response.data : err);
      toast.error("Something went wrong while placing order");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'
    >
      
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required name='firstName' onChange={onChangeHandler} className='border p-2 w-full' placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} className='border p-2 w-full' placeholder='Last name' />
        </div>

        <input required name='email' onChange={onChangeHandler} className='border p-2 w-full' placeholder='Email' />
        <input required name='street' onChange={onChangeHandler} className='border p-2 w-full' placeholder='Street' />

        <div className='flex gap-3'>
          <input required name='city' onChange={onChangeHandler} className='border p-2 w-full' placeholder='City' />
          <input name='state' onChange={onChangeHandler} className='border p-2 w-full' placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required name='zipcode' onChange={onChangeHandler} className='border p-2 w-full' placeholder='Zipcode' />
          <input required name='country' onChange={onChangeHandler} className='border p-2 w-full' placeholder='Country' />
        </div>

        <input required name='phone' onChange={onChangeHandler} className='border p-2 w-full' placeholder='Phone' />
      </div>

      
      <div className='mt-8'>
        <CartTotal />

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className={`border p-3 cursor-pointer ${method==='stripe'?'border-black':''}`}>
              <img src={assets.stripe_logo} className='h-5' alt="Stripe" />
            </div>

            <div onClick={() => setMethod('razorpay')} className={`border p-3 cursor-pointer ${method==='razorpay'?'border-black':''}`}>
              <img src={assets.razorpay_logo} className='h-5' alt="Razorpay" />
            </div>

            <div onClick={() => setMethod('cod')} className={`border p-3 cursor-pointer ${method==='cod'?'border-black':''}`}>
              CASH ON DELIVERY
            </div>
          </div>

          <div className='text-end mt-8'>
            <button
              type="submit"
              className='bg-black text-white px-16 py-3 text-sm'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;