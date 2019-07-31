import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import PageWrapper from '../components/PageWrapper';
import Config from '../config';
import wp from '../src/lib/wp';

function tokenExpired() {
  if (process.browser) {
    localStorage.removeItem(Config.AUTH_TOKEN);
  }
  wp.setHeaders({ authorization: '' });
  Router.push('/login');
}

type Props = {
  posts: any[];
  pages: any[];
  headerMenu: any;
  page: any;
};

type State = {
  id: string;
};

class Index extends React.Component<Props, State> {
  readonly state: State = {
    id: '',
  };

  static async getInitialProps() {
    try {
      const [page, posts, pages] = await Promise.all([
        wp
          .pages()
          .slug('home')
          .embed()
          .then(data => {
            return data[0];
          }),
        wp.posts().embed(),
        wp.pages().embed(),
      ]);

      return { page, posts, pages };
    } catch (err) {
      if (err.data.status === 403) {
        tokenExpired();
      }
    }

    return null;
  }

  componentDidMount() {
    const token = localStorage.getItem(Config.AUTH_TOKEN);
    if (token) {
      wp.setHeaders({ authorization: `Bearer ${token}` });
      wp.users()
        .me()
        .then((data: any) => {
          const { id } = data;
          this.setState({ id });
        })
        .catch((err: any) => {
          if (err.data.status === 403) {
            tokenExpired();
          }
        });
    }
  }

  render() {
    const { id } = this.state;
    const { posts, pages, headerMenu, page } = this.props;

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <img
          src="/static/images/wordpress-plus-react-header.png"
          width="815"
          alt="logo"
          style={{ marginTop: 50, marginBottom: 50 }}
        />
        <h1>{page.title.rendered}</h1>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
        />
        <h2>Posts</h2>
        {posts.map(post => (
          <ul key={post.slug}>
            <li>
              <Link as={`/post/${post.slug}`} href={`/post?slug=${post.slug}&apiRoute=post`}>
                <a>{post.title.rendered}</a>
              </Link>
            </li>
          </ul>
        ))}
        <h2>Pages</h2>
        {pages.map(ipage => (
          <ul key={ipage.slug}>
            <li>
              <Link as={`/page/${ipage.slug}`} href={`/post?slug=${ipage.slug}&apiRoute=page`}>
                <a>{ipage.title.rendered}</a>
              </Link>
            </li>
          </ul>
        ))}
        {id ? (
          <div>
            <h2>You Are Logged In</h2>
            <p>
              Your user ID is <span>{id}</span>, retrieved via an authenticated API query.
            </p>
          </div>
        ) : (
          <div>
            <h2>You Are Not Logged In</h2>
            <p>
              The frontend is not making authenticated API requests. <a href="/login">Log in.</a>
            </p>
          </div>
        )}
        <h2>Where You&apos;re At</h2>
        <p>
          You are looking at the REST API-powered React frontend. Be sure to also check out the{' '}
          <a href="http://localhost:3001/">GraphQL-powered frontend</a>.
        </p>
      </Layout>
    );
  }
}

export default PageWrapper(Index);
