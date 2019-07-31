import { AppBar, Button, Toolbar } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/styles';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import Config from '../config';
import LogoSvg from '../static/images/logo.svg';

const styles = {
  Menu__left: {
    flexGrow: 1,
  },

  Menu__logo: {
    fill: '#fff',
    left: '50%',
    position: 'absolute' as const,
    transform: 'translateX(-50%)',
  },
};

function getSlug(url: string) {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
}

type Props = WithStyles<typeof styles> & {
  menu: any;
};

type State = {
  token: string | null;
  username: string | null;
};

class Menu extends React.Component<Props, State> {
  readonly state: State = {
    token: null,
    username: null,
  };

  componentDidMount() {
    const token = localStorage.getItem(Config.AUTH_TOKEN);
    const username = localStorage.getItem(Config.USERNAME);
    this.setState({ token, username });
  }

  renderMenuItems() {
    const { menu } = this.props;

    return menu.items.map((item: any) => {
      if (item.object === 'custom') {
        return (
          <Link key={item.ID} href={item.url} passHref>
            <Button color="inherit">{item.title}</Button>
          </Link>
        );
      }
      const slug = getSlug(item.url);
      const actualPage = item.object === 'category' ? 'category' : 'post';
      return (
        <Link
          key={item.ID}
          as={`/${item.object}/${slug}`}
          href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          passHref
        >
          <Button color="inherit">{item.title}</Button>
        </Link>
      );
    });
  }

  render() {
    const { classes } = this.props;
    const { token, username } = this.state;

    return (
      <AppBar position="static">
        <Toolbar>
          <div className={classes.Menu__left}>
            <Link href="/" passHref>
              <Button color="inherit">Home</Button>
            </Link>
            {this.renderMenuItems()}
          </div>
          <LogoSvg className={classes.Menu__logo} />
          <div>
            {token ? (
              <button
                type="button"
                className="pointer black"
                onClick={() => {
                  localStorage.removeItem(Config.AUTH_TOKEN);
                  Router.push('/login');
                }}
              >
                Logout {username}
              </button>
            ) : (
              <Link href="/login" passHref>
                <Button color="inherit">Login</Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Menu);
