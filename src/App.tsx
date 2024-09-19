import React, {useContext, useState} from 'react';
import { CreateProduct } from "./components/CreateProduct";
import { ErrorMessage } from "./components/ErrorMessage";
import { Loader } from "./components/Loader";
import { Modal } from "./components/Modal";
import { Product } from "./components/Product";
import { useProducts } from "./hooks/products";
import { IProduct } from './models';
import { ModalContext } from './context/ModalContext';

function App() {
  const {loading, products, error, addProduct} = useProducts();
  // const [modal, setModal] = useState(false);
  const {modal, open, close} = useContext(ModalContext);

  const createHandler = (product: IProduct) => {
    // setModal(false)
    close()
    addProduct(product)
  }
  
  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map(product => <Product product={product} key={product.id} />)}

      {modal && <Modal title="Create new product" onClose={() => setModal(false)}>
        <CreateProduct onCreate={createHandler} />
      </Modal>}

      <button 
        className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
        onClick={() => setModal(true)}
      >
        +
      </button>
    </div>
  )
}

export default App;
