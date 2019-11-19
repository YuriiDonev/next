import React, { Fragment } from 'react';
import Head from 'next/head';
import Header from '../shared/header.js';

const description = 'Welcome to the portfolio website of Yurii Donev. You will get your project done with professional and top quality service in web development';
const keywords = 'server side rendering, SSR, how does server side rendering work, what is server side rendering, Donev Iurii, Portfolio, best web developer, React developer, front end developer';

const BaseLayout = (props) => {
  const { className, children, title } = props;
  const headerType = props.headerType || 'default';

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta property='og:title' content='Donev Yurii Portfolio' />
        <meta property='og:description' content={description} />
        <link rel='icon' type='image/ico' href='/static/favicon.ico' />
        <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap' rel='stylesheet' />
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
