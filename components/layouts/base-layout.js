import React, { Fragment } from 'react';
import Head from 'next/head';
import Header from '../shared/header.js';

const description = 'Welcome to the portfolio website of Yurii Donev. You will get your project done with professional and top quality service in web development';

const BaseLayout = (props) => {
  const { className, children, title } = props;
  const headerType = props.headerType || 'default';

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content='Donev, Portfolio, best web developer, React developer, front end developer' />
        <meta property='og:title' content='Donev Yurii Portfolio' />
        <meta property='og:description' content={description} />

        <link rel='icon' type='image/ico' href='/static/favicon.ico' />

      </Head>
      <div className="layout-container">
        <Header classNameHeader={`port-nav-${headerType}`} {...props} />
        <main className={`cover ${className}`}>
          <div className="wrapper">
            { children }
          </div>
        </main>
      </div>
    </Fragment>
  );
}

BaseLayout.defaultProps = {
  className: ''
}

export default BaseLayout;
