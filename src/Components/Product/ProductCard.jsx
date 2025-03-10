import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../Currencyformat/CurrencyFormat';
import classes from './Product.module.css'
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import {type } from '../../Utility/action.type';

function ProductCard({ product, flex,  renderDesc, renderAdd }) {
    const { image, title, id, price, rating , description} = product; 
    const [state, dispatch] = useContext(DataContext) ;


   const addToCart =() =>{
     dispatch ({
        type:type.ADD_TO_BASKET,
        item :{
            image, title, id, price, rating , description
        }
     })
   }



    return (
        <div className={`${classes.card__container} ${flex?classes.product__flexed : ''}`}>
            <Link to={`/products/${id}`}>
                <img src={image} alt={title} width="150" />
            </Link>
            <div>
                <h3>{title}</h3>
                {renderDesc && <div style={{maxWidth:"800px"}}>{description}</div>}
                <div className={classes.rating}>
                    {/* Rating */}
                    <Rating value={rating?.rate || 0} precision={0.1} readOnly />
                    {/* Count */}
                    <small>{rating?.count || 0} reviews</small>
                </div>
                <div>
                    {/* Price */}
                    <CurrencyFormat amount={price} />
                </div>
                {
                    renderAdd &&  <button className={classes.button} onClick={addToCart}>
                    add to cart
                  </button>
                }


            

            </div>
        </div>
    );
}

export default ProductCard;
