import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

const AmazonFooter = () => {
  return (
    <footer className={classes.footer}>
      {/* Back to top */}
      <button className={classes.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Back to top
      </button>

      {/* Links Section */}
      <div className={classes.footerLinks}>
        <div className={classes.footerColumn}>
          <h2>Get to Know Us</h2>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
            <li>Amazon Devices</li>
            <li>Amazon Science</li>
          </ul>
        </div>

        <div className={classes.footerColumn}>
          <h2>Make Money with Us</h2>
          <ul>
            <li>Sell products on Amazon</li>
            <li>Sell on Amazon Business</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
            <li>Host an Amazon Hub</li>
            <li>› See More Make Money with Us</li>
          </ul>
        </div>

        <div className={classes.footerColumn}>
          <h2>Amazon Payment Products</h2>
          <ul>
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Amazon Currency Converter</li>
          </ul>
        </div>

        <div className={classes.footerColumn}>
          <h2>Let Us Help You</h2>
          <ul>
            <li>Amazon and COVID-19</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Returns & Replacements</li>
            <li>Manage Your Content and Devices</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      {/* Logo and Copyright */}
      <div className={classes.footerBottom}>
        <div className={classes.footerLogo}>
        <Link to="/">
            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon logo"  />
          </Link>
        </div>
        <p>© 2025 Amazon Clone | Built by Hana Tesfaye. All rights reserved.</p>

      </div>
    </footer>
  );
};

export default AmazonFooter;
