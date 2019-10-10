import React, { Children } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

const ActiveLink = ({ children, router, ...props }) => {
  const child = Children.only(children);
  let className = child.props.className || '';
  if (router.asPath === props.route && props.activeClassName) {
    className = `${className} ${props.activeClassName}`;
  }
  return <Link href={props.route}>{React.cloneElement(child, {className})}</Link>;
};

export default withRouter(ActiveLink);






// import React from 'react';
// import Link from 'next/link';
// import { withRouter } from 'next/router';
//
// const checkIsActive = (route, asPath) => {
//   return route === asPath ? 'active' : '';
// }
//
// const ActiveLink = props => {
//   const { router, route, title } = props;
//   const isActive = checkIsActive(route, router.asPath);
//   return <Link href={route}>
//     <a className={`nav-link port-navbar-link ${isActive}`}>{title}</a>
//   </Link>;
// };
//
// export default withRouter(ActiveLink);
