import React, {useState} from 'react'
import { IProduct } from '../models'
import axios from 'axios'
import { ErrorMessage } from './ErrorMessage'

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum set',
  image: '',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10
  }
}

interface CreateProductProps {
  onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (value.trim().length === 0) {
      setError('Please enter valid title')
    }

    productData.title = value
    const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
    onCreate(response.data)
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    return
  }

  return (
    <form onSubmit={submitHandler}>
      <input 
        value={value}
        onChange={changeHandler}
        type="text"
        className='border py-2 px-4 mb-2 w-full outline-0'
        placeholder='Enter product title...' 
      />

      {error && <ErrorMessage error={error} />}

      <button type='submit' className='py-2 px-4 border bg-yellow-400 hover:text-white'>Create</button>
    </form>
  )
}