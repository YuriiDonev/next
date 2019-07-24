import { Fragment } from 'react';
import Header from '../shared/header.js';

const BaseLayout = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  );
}

export default BaseLayout;
