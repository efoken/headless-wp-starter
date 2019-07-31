import { Box, Heading, Image, Paragraph } from 'grommet';
import React from 'react';
import { Product } from '../src/types/WooCommerceAPI';

type Props = {
  product: Product;
};

const ProductListItem: React.FC<Props> = ({ product }) => (
  <Box>
    <Box height="medium">
      <Image fit="cover" src={product.images[0].sizes[0].src} alt={product.name} />
    </Box>
    <Heading level={4}>{product.name}</Heading>
    <Paragraph>{product.categories[0].name}</Paragraph>
    <Paragraph dangerouslySetInnerHTML={{ __html: product.price_html }} />
  </Box>
);

export default ProductListItem;
