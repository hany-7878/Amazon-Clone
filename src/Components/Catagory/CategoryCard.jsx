import React from 'react';
import classes from './category.module.css'
import { Link } from 'react-router-dom';

function CategoryCard({ data }) { 
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
            <h4>{data?.name}</h4> 
        </span>
        <img src={data?.imgLink} alt='' /> 
        <p>Shop now</p>
      </Link>
      
    </div>
  );
}

export default CategoryCard;
