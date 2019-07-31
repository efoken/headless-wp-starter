import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Head, Main, NextDocumentContext, NextScript } from 'next/document';
import React from 'react';
import theme from '../src/lib/theme';

export default class CustomDocument extends Document {
  static async getInitialProps(context: NextDocumentContext) {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = context.renderPage;

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(context);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          {initialProps.styles}
          {sheets.getStyleElement()}
        </React.Fragment>
      ),
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900,900i&subset=latin-ext&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
