import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { productUrl } from '../../Api/endPoint';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

function ProductDetail() {
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(true); 
    const [product, setProduct] = useState({});

    useEffect(() => {
        setIsLoading(true); 
        axios.get(`${productUrl}/products/${productId}`)
            .then((res) => {
                setProduct(res.data);
                console.log(res.data); 
                setIsLoading(false); 
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false); 
            });
    }, [productId]); 

    return (
        <Layout>
            {isLoading ? <Loader /> : <ProductCard product={product}
              flex ={true} 
              renderDesc={true}
              renderAdd={true}
              />}
          
        </Layout>
    );
}

export default ProductDetail;
