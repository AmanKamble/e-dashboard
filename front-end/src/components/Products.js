import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/delete/${id}`, {
            method: "Delete"
        });
        result = await result.json()
        if (result.deletedCount === 1 && result.acknowledged === true ) {
            alert('Record deleted Successfully!');
            getProducts();
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value;
        let result = await fetch(`http://localhost:5000/search/${key}`)
        result = await result.json();
        if(result != null){
            setProducts(result);
        }
    }
    return (
        <div className='product-list lg:w-2/3 w-full mx-auto overflow-auto'>
                    <div className="lex flex-col text-center w-full mb-20 text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Product List</h1>
                        <div className="h-1 w-100 bg-red-500 rounded"></div>
                    </div>

            <div className="text-left mb-4">
                <label for="search" className="leading-7 text-sm text-gray-600">Search Product</label>
                <input type="text" id="search" name="search" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Search Product' onChange={searchHandle}  />
            </div>

            <table className="table-auto w-full text-left whitespace-no-wrap shadow-lg">
        <thead>
          <tr>
            <th className="px-4 border py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Sr. No</th>
            <th className="px-4 border py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
            <th className="px-4 border py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
            <th className="px-4 border py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Company</th>
            <th className="px-4 border py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Category</th>
            <th className="px-4 border py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Operation</th>
          </tr>
        </thead>
        <tbody>
        {
            products.map((item, index) =>
                <tr  key={item._id}>
                    <td className="px-4 border py-3">{index + 1}</td>
                    <td className="px-4 border py-3">{item.name}</td>
                    <td className="px-4 border py-3">{item.price}</td>
                    <td className="px-4 border py-3 text-lg text-gray-900">{item.company}</td>
                    <td className="px-4 border py-3 text-lg text-gray-900">{item.category}</td>
                    <td className="w-100 text-center inline-flex">
                    <button className="inline-flex text-white bg-red-500 border-0 m-1 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={() => prompt(`Do You Want to delete record? if yes please enter "Yes".`)?deleteProduct(item._id):'' }> Delete </button>
                    <button className="inline-flex text-white bg-indigo-500 border-0 m-1 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"> <Link to={`/update/${item._id}`}> Update </Link> </button>
                    </td>
                </tr>
             )
        }
        </tbody>
      </table>
           
        </div>
    )
}

export default Products;