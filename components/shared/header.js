import { Fragment } from 'react';
import Link from 'next/link';

import '../../styles/main.scss';

const Index = () => {
  return (
    <Fragment>
      <Link href='/'>
        <span>Home</span>
      </Link>
      <Link href='/about'>
        <span>About</span>
      </Link>
      <Link href='/portfolios'>
        <span>Portfolios</span>
      </Link>
      <Link href='/cv'>
        <span>CV</span>
      </Link>
    </Fragment>
  );
}

export default Index;
