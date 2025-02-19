import React from 'react'
import classes from "./Header.module.css"

import { SlLocationPin } from "react-icons/sl";
import LowerHeader from './LowerHeader';
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";

function Header() {
  return (
    <section>
      <div className={classes.header__container}>
        {/* logo section */}
        <div className={classes.logo__container}>
          <a href="">
            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon logo" />
          </a>

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
          <BsSearch size={25} />
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
          <a href="">
            <p>Hello,Sign In</p>
            <span>Account & Lists</span>
          </a>

          {/* Orders */}
          <a href="" className={classes.order__container}>
            <p>Returns</p>
            <span>& Orders</span>
          </a>

          {/* Cart */}
          <a href="/cart" className={classes.cart}>
            <BiCart size={25} />
            <span>0</span>
          </a>
        </div>
      </div>
      <LowerHeader/>
    </section>
  )
}

export default Header
