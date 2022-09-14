import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const Update = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails()
    }, [])

    const getProductDetails = async () => {
        console.log(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        
    }

    const updateProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        
        let result = await fetch(`http://localhost:5000/update/${params.id}`,{
            method:'Put',
            body: JSON.stringify({name, price, category, company}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json()
        console.log(result);
        if(result)
        {
            navigate('/');
        }
    }


    return (
        <div className='updateProduct'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter Product Name' className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter Valid Name</span>}

            <input type="text" placeholder='Enter Product Price' className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price && <span className='invalid-input'>Enter Valid Price</span>}

            <input type="text" placeholder='Enter Product Category' className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <span className='invalid-input'>Enter Valid Category</span>}

            <input type="text" placeholder='Enter Product Company' className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company && <span className='invalid-input'>Enter Valid Company</span>}

            <button className='updateButton' onClick={updateProduct} >Add Product</button>
        </div>
    )
}

export default Update;