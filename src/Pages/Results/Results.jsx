import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoint';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './Results.module.css'; 
import Loader from '../../Components/Loader/Loader'; // Make sure this path is correct

function Results() {
    const [results, setResults] = useState([]);
    const { categoryName } = useParams();
    const [isLoading, setIsLoading] = useState(true); // Set initial state to true

    useEffect(() => {
        setIsLoading(true); // Ensure loading starts when fetching
        
        axios.get(`${productUrl}/products/category/${categoryName}`)
            .then((res) => {
                console.log(res.data)
                setResults(res.data);
                setIsLoading(false); 
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false); 
            });
    }, [categoryName]); 

    return (
        <Layout>
            <section>
                <h1 style={{ padding: '30px' }}>Results</h1>
                <p style={{ padding: '30px' }}>Category/{categoryName}</p>
                <hr />
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className={classes.product_container}>
                        {results?.map((product) => (
                            <ProductCard key={product.id} 
                            product={product}
                            renderDesc={false} 
                            renderAdd={true}/>
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    );
}

export default Results;
