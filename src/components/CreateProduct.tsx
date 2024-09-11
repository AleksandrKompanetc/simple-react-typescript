import React, {useState} from 'react';
import { IProduct } from '../models';
import axios from 'axios';

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10
  }
}

export function CreateProduct() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    if (value.trim().length === 0) {
      setError('Please enter valid title')
      return
    }

    productData.title = value
    const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);  // Доступ к значению input
}

  return (
    <form onSubmit={submitHandler}>
      <input 
        type="text"
        className='border py-2 px-4 mb-2 w-full outline-0'
        placeholder='Enter product title...' 
        value={value}
        onChange={changeHandler}
      />
      <button
        type='submit'
        className='py-2 px-4 border bg-yellow-400 hover:text-white'>Create</button>
    </form>
  )
}