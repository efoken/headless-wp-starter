import { NextContext } from 'next';
import Error from 'next/error';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import PageWrapper from '../components/PageWrapper';
import wp from '../src/lib/wp';

type Props = {
  categories: any[];
  posts: any[];
  headerMenu: any;
};

class Category extends React.Component<Props> {
  static async getInitialProps({ query }: NextContext) {
    const { slug } = query;

    const categories = await wp
      .categories()
      .slug(slug as string)
      .embed();

    if (categories.length > 0) {
      const posts = await wp
        .posts()
        .category(categories[0].id)
        .embed();
      return { categories, posts };
    }

    return { categories };
  }

  render() {
    const { categories, posts, headerMenu } = this.props;
    if (categories.length === 0) return <Error statusCode={404} />;

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <h1>{categories[0].name} Posts</h1>
        {posts.map(post => (
          <ul key={post.slug}>
            <li>
              <Link as={`/post/${post.slug}`} href={`/post?slug=${post.slug}&apiRoute=post`}>
                <a>{post.title.rendered}</a>
              </Link>
            </li>
          </ul>
        ))}
      </Layout>
    );
  }
}

export default PageWrapper(Category);
