import { Fragment } from 'react';
import Header from '../shared/header.js';

const BaseLayout = (props) => {
  const { className } = props;
  const headerType = props.headerType || 'default';

  return (
    <div className="layout-container" >
      <Header classNameHeader={`port-nav-${headerType}`} {...props} />
      <main className={`cover ${className}`}>
        <div className="wrapper">
          { props.children }
        </div>
      </main>
    </div>
  );
}

BaseLayout.defaultProps = {
  className: ''
}

export default BaseLayout;
