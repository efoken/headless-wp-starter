import { NextComponentType, NextContext } from 'next';
import React from 'react';
import wp from '../src/lib/wp';

const PageWrapper = (Component: NextComponentType<any>) =>
  class extends React.Component {
    static async getInitialProps(context: NextContext) {
      const [headerMenu, childProps] = await Promise.all([
        wp.menus().id('header-menu'),
        Component.getInitialProps && Component.getInitialProps(context),
      ]);

      return {
        headerMenu,
        ...(Component.getInitialProps ? childProps : null),
      };
    }

    render() {
      return <Component {...this.props} />;
    }
  };

export default PageWrapper;
