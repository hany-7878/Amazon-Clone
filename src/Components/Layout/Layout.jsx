import React from 'react';
import Header from '../Header/Header';
import AmazonFooter from '../Footer/Footer';

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <AmazonFooter/>
    </div>
  );
}

export default Layout;
