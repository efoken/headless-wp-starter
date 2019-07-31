import React from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
