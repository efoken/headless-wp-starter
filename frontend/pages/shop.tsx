import { Box, Grid } from 'grommet';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import PageWrapper from '../components/PageWrapper';
import ProductListItem from '../components/ProductListItem';
import wc from '../src/lib/wc';
import { Product } from '../src/types/WooCommerceAPI';

type Props = {
  products: Product[];
  headerMenu: any;
};

class Shop extends React.Component<Props> {
  static async getInitialProps(): Promise<Partial<Props>> {
    const products = await wc.get('products').then(res => {
      return res.data;
    });
    return { products: Array.isArray(products) ? products : [products] };
  }

  render() {
    const { products, headerMenu } = this.props;

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <Box width="xlarge" margin={{ horizontal: 'auto' }} pad="medium">
          {products && (
            <Grid columns="306px" gap="medium">
              {products.map(product => (
                <Link
                  key={product.id}
                  as={`/product/${product.slug}`}
                  href={`/product?slug=${product.slug}&apiRoute=product`}
                >
                  <a>
                    <ProductListItem product={product} />
                  </a>
                </Link>
              ))}
            </Grid>
          )}
        </Box>
      </Layout>
    );
  }
}

export default PageWrapper(Shop);
