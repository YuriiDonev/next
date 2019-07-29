import { Fragment } from 'react';
import Link from 'next/link';
import { Link as NextLink } from '../../routes.js';

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

      {/* <NextLink route='test' params={{id: '2'}}><a>Test 2</a></NextLink>
      <NextLink route='/test/5'><a>Test 5</a></NextLink> */}

    </Fragment>
  );
}

export default Index;
