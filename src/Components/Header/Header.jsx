import React, { useContext } from 'react'
import classes from "./Header.module.css"
import { Link } from 'react-router-dom';

import { SlLocationPin } from "react-icons/sl";
import LowerHeader from './LowerHeader';
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { DataContext,DataProvider } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';


function Header() {
  const [{basket, user}, dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount, item)=>{
    return item.amount+amount
  },0)
  
  return (
    <section className={classes.fixed}>
      <div className={classes.header__container}>
        {/* logo section */}
        <div className={classes.logo__container}>
          <Link to="/">
            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon logo" />
          </Link>

          {/* delivery */}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* search section */}
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <BsSearch size={35} />
        </div>

        {/* language and flag */}
        <div className={classes.language__container}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png" alt="US Flag" />
          <select>
            <option value="">EN</option>
          </select>
        </div>

        {/* right side links */}
        <div className={classes.right__links}>
          {/* Sign In */}
          <Link to={!user && "/auth"}>
          <div>
            {user? (
              <>
                <p>Hello {user?.email?.split("@")[0]}</p>
                <span onClick={() => auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                 <p>Hello,Sign In</p>
                 <span>Account & Lists</span>
                </>
              )}
          </div>
            
          </Link>

          {/* Orders */}
          <Link to="/orders" className={classes.order__container}>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={classes.cart}>
            <BiCart size={25} />
            <span className={classes.span0}>{totalItem}</span>
            <p>Cart</p>
          </Link>
        </div>
      </div>
      <LowerHeader/>
    </section>
  )
}

export default Header
