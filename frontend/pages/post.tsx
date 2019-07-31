import { NextContext } from 'next';
import Error from 'next/error';
import React from 'react';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import PageWrapper from '../components/PageWrapper';
import wp from '../src/lib/wp';

type Props = {
  post: any;
  headerMenu: any;
};

class Post extends React.Component<Props> {
  static async getInitialProps(context: NextContext) {
    const { slug, apiRoute } = context.query;

    let apiMethod = wp.posts();

    switch (apiRoute) {
      case 'category':
        apiMethod = wp.categories();
        break;
      case 'page':
        apiMethod = wp.pages();
        break;
      default:
        break;
    }

    const post = await apiMethod
      .slug(slug as string)
      .embed()
      .then((data: any) => {
        return data[0];
      });

    return { post };
  }

  render() {
    const { post, headerMenu } = this.props;
    if (!post.title) return <Error statusCode={404} />;

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <h1>{post.title.rendered}</h1>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Post);
