export interface ProductImage {
  /** Image ID. */
  id: number;
  /** The date the image was created, in the site's timezone. READ-ONLY */
  date_created: string;
  /** The date the image was created, as GMT. READ-ONLY */
  date_created_gmt: string;
  /** The date the image was last modified, in the site's timezone. READ-ONLY */
  date_modified: string;
  /** The date the image was last modified, as GMT. READ-ONLY */
  date_modified_gmt: string;
  /** Image URL. */
  src: string;
  /** Image name. */
  name: string;
  /** Image alternative text. */
  alt: string;
  /** Image sizes. */
  sizes: {
    /** Image size URL. */
    src: string;
    /** Image size name. */
    name: string;
    /** Image width. */
    width: number;
    /** Image height. */
    height: number;
  }[];
}

export interface Product {
  /** Unique identifier for the resource. READ-ONLY */
  id: number;
  /** Product name. */
  name: string;
  /** Product slug. */
  slug: string;
  /** Product URL. READ-ONLY */
  permalink: string;
  /** The date the product was created, in the site's timezone. READ-ONLY */
  date_created: Date | string;
  /** The date the product was created, as GMT. READ-ONLY */
  date_created_gmt: Date | string;
  /** The date the product was last modified, in the site's timezone. READ-ONLY */
  date_modified: Date | string;
  /** The date the product was last modified, as GMT. READ-ONLY */
  date_modified_gmt: Date | string;
  /** Product type. Options: simple, grouped, external and variable. Default is simple. */
  type: 'simple' | 'grouped' | 'external' | 'variable';
  /** Product status (post status). Options: draft, pending, private and publish. Default is publish. */
  status: 'draft' | 'pending' | 'private' | 'publish';
  /** Featured product. Default is false. */
  featured: boolean;
  /** Catalog visibility. Options: visible, catalog, search and hidden. Default is visible. */
  catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden';
  /** Product description. */
  description: string;
  /** Product short description. */
  short_description: string;
  /** Unique identifier. */
  sku: string;
  /** Current product price. READ-ONLY */
  price: string;
  /** Product regular price. */
  regular_price: string;
  /** Product sale price. */
  sale_price: string;
  /** Start date of sale price, in the site's timezone. */
  date_on_sale_from: Date | string;
  /** Start date of sale price, as GMT. */
  date_on_sale_from_gmt: Date | string;
  /** End date of sale price, in the site's timezone. */
  date_on_sale_to: Date | string;
  /** End date of sale price, as GMT. */
  date_on_sale_to_gmt: Date | string;
  /** Price formatted in HTML. READ-ONLY */
  price_html: string;
  /** Shows if the product is on sale. READ-ONLY */
  on_sale: boolean;
  /** Shows if the product can be bought. READ-ONLY */
  purchasable: boolean;
  /** Amount of sales. READ-ONLY */
  total_sales: number;
  /** If the product is virtual. Default is false. */
  virtual: boolean;
  /** If the product is downloadable. Default is false. */
  downloadable: boolean;
  /** List of downloadable files. */
  downloads: {
    /** File ID. */
    id: string;
    /** File name. */
    name: string;
    /** File URL. */
    file: string;
  }[];
  /** Number of times downloadable files can be downloaded after purchase. Default is -1. */
  download_limit: number;
  /** Number of days until access to downloadable files expires. Default is -1. */
  download_expiry: number;
  /** Product external URL. Only for external products. */
  external_url: string;
  /** Product external button text. Only for external products. */
  button_text: string;
  /** Tax status. Options: taxable, shipping and none. Default is taxable. */
  tax_status: 'taxable' | 'shipping' | 'none';
  /** Tax class. */
  tax_class: string;
  /** Stock management at product level. Default is false. */
  manage_stock: boolean;
  /** Stock quantity. */
  stock_quantity: number;
  /** Controls the stock status of the product. Options: instock, outofstock, onbackorder. Default is instock. */
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  /** If managing stock, this controls if backorders are allowed. Options: no, notify and yes. Default is no. */
  backorders: 'no' | 'notify' | 'yes';
  /** Shows if backorders are allowed. READ-ONLY */
  backorders_allowed: boolean;
  /** Shows if the product is on backordered. READ-ONLY */
  backordered: boolean;
  /** Allow one item to be bought in a single order. Default is false. */
  sold_individually: boolean;
  /** Product weight. */
  weight: string;
  /** Product dimensions. */
  dimensions: {
    /** Product length. */
    length: string;
    /** Product width. */
    width: string;
    /** Product height. */
    height: string;
  };
  /** Shows if the product need to be shipped. READ-ONLY */
  shipping_required: boolean;
  /** Shows whether or not the product shipping is taxable. READ-ONLY */
  shipping_taxable: boolean;
  /** Shipping class slug. */
  shipping_class: string;
  /** Shipping class ID. READ-ONLY */
  shipping_class_id: number;
  /** Allow reviews. Default is true. */
  reviews_allowed: boolean;
  /** Reviews average rating. READ-ONLY */
  average_rating: string;
  /** Amount of reviews that the product have. READ-ONLY */
  rating_count: number;
  /** List of related products IDs. READ-ONLY */
  related_ids: number[];
  /** List of up-sell products IDs. */
  upsell_ids: number[];
  /** List of cross-sell products IDs. */
  cross_sell_ids: number[];
  /** Product parent ID. */
  parent_id: number;
  /** Optional note to send the customer after purchase. */
  purchase_note: string;
  /** List of categories. */
  categories: {
    /** Category ID. */
    id: number;
    /** Category name. READ-ONLY */
    name: string;
    /** Category slug. READ-ONLY */
    slug: string;
  }[];
  /** List of tags. */
  tags: {
    /** Tag ID. */
    id: number;
    /** Tag name. READ-ONLY */
    name: string;
    /** Tag slug. READ-ONLY */
    slug: string;
  }[];
  /** List of images. */
  images: ProductImage[];
  /** List of attributes. */
  attributes: {
    /** Attribute ID. */
    id: number;
    /** Attribute name. */
    name: string;
    /** Attribute position. */
    position: number;
    /** Define if the attribute is visible on the "Additional information" tab in the product's page. Default is false. */
    visible: boolean;
    /** Define if the attribute can be used as variation. Default is false. */
    variation: boolean;
    /** List of available term names of the attribute. */
    options: string[];
  }[];
  /** Defaults variation attributes. */
  default_attributes: {
    /** Attribute ID. */
    id: number;
    /** Attribute name. */
    name: string;
    /** Selected attribute term name. */
    option: string;
  }[];
  /** List of variations IDs. READ-ONLY */
  variations: number[];
  /** List of grouped products ID. */
  grouped_products: number[];
  /** Menu order, used to custom sort products. */
  menu_order: number;
  /** Meta data. See Product - Meta data properties */
  meta_data: {
    /** Meta ID. READ-ONLY */
    id: number;
    /** Meta key. */
    key: string;
    /** Meta value. */
    value: string;
  }[];
}

export interface WooCommerceAPI {
  '/wp-json/wc/v3/products/:id': {
    GET: {
      params: {
        id: string;
      };
      response: Product;
    };
  };
  '/wp-json/wc/v3/products': {
    GET: {
      query: {
        /** Scope under which the request is made; determines fields present in response. Options: view and edit. Default is view. */
        context?: 'view' | 'edit';
        /** Current page of the collection. Default is 1. */
        page?: number;
        /** Maximum number of items to be returned in result set. Default is 10. */
        search?: string;
        /** Limit results to those matching a string. */
        per_page?: number;
        /** Limit response to resources published after a given ISO8601 compliant date. */
        after?: string;
        /** Limit response to resources published before a given ISO8601 compliant date. */
        before?: string;
        /** Ensure result set excludes specific IDs. */
        exclude?: number[];
        /** Limit result set to specific ids. */
        include?: number[];
        /** Offset the result set by a specific number of items. */
        offset?: number;
        /** Order sort attribute ascending or descending. Options: asc and desc. Default is desc. */
        order?: 'asc' | 'desc';
        /** Sort collection by object attribute. Options: date, id, include, title and slug. Default is date. */
        orderby?: 'date' | 'id' | 'include' | 'title' | 'slug';
        /** Limit result set to those of particular parent IDs. */
        parent?: number[];
        /** Limit result set to all items except those of a particular parent ID. */
        parent_exclude?: number[];
        /** Limit result set to products with a specific slug. */
        slug?: string;
        /** Limit result set to products assigned a specific status. Options: any, draft, pending, private and publish. Default is any. */
        status?: 'any' | 'draft' | 'pending' | 'private' | 'publish';
        /** Limit result set to products assigned a specific type. Options: simple, grouped, external and variable. */
        type?: 'simple' | 'grouped' | 'external' | 'variable';
        /** Limit result set to products with a specific SKU. */
        sku?: string;
        /** Limit result set to featured products. */
        featured?: boolean;
        /** Limit result set to products assigned a specific category ID. */
        category?: string;
        /** Limit result set to products assigned a specific tag ID. */
        tag?: string;
        /** Limit result set to products assigned a specific shipping class ID. */
        shipping_class?: string;
        /** Limit result set to products with a specific attribute. */
        attribute?: string;
        /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
        attribute_term?: string;
        /** Limit result set to products with a specific tax class. Default options: standard, reduced-rate and zero-rate. */
        tax_class?: 'standard' | 'reduced-rate' | 'zero-rate';
        /** Limit result set to products on sale. */
        on_sale?: boolean;
        /** Limit result set to products based on a minimum price. */
        min_price?: string;
        /** Limit result set to products based on a maximum price. */
        max_price?: string;
        /** Limit result set to products with specified stock status. Options: instock, outofstock and onbackorder. */
        stock_status?: 'instock' | 'outofstock' | 'onbackorder';
      };
      response: Product[];
    };
  };
}
