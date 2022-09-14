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
        console.log(id)
        result = await result.json()
        if (result) {
            alert("recod is deleted")
        }
    };

    const searchHandle = async (event) => {
        console.warn(event.target.value);
        let key = event.target.value;
        let result = await fetch(`http://localhost:5000/search/${key}`)
    }

    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <input className='search-product-box' type="text" placeholder='Search Product' onChange={searchHandle} />
            <ul>
                <li>Sr. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Company</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.company}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <button><Link to={`/update/${item._id}`}>Update</Link></button>
                        </li>
                    </ul>
                )
            }
        </div>
    )
}

export default Products;