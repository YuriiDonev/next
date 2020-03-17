import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import Typed from 'react-typed';
import Link from 'next/link';
import { Container, Button, Row, Col } from 'reactstrap';

const strings = [
  'React.js',
  'React-Native',
  'Next.js SSR Server Side Rendering',
  'Angular.js',
  'Angular 2+',
  'Node.js',
  'Express.js',
  'PWA Progressive Web Application'
];

import { getPortfolios } from '../services/endpoints.js';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipping: false
    },
    this.cardAnimationInterval = null;
  }

  componentDidMount() {
    this.animateCard();
  }

  animateCard = () => {
    this.cardAnimationInterval = setInterval(() => {
      this.setState({ isFlipping: !this.state.isFlipping });
    }, 15000);
  }

  componentWillUnmount() {
    if (this.cardAnimationInterval) {
      clearInterval(this.cardAnimationInterval);
    }
  }

  render() {
    const { isFlipping } = this.state;

    return (
      <BaseLayout
        title={'Yurii Donev - Portfolio'}
        className={`cover ${isFlipping ? 'cover-1' : 'cover-0'}`}
        headerType={'index'}
      >
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index.png" alt="" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>

                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history
                        </div>
                      </div>
                      <img className="image" src="/static/images/section-1.jpg" alt='Yurii Donev developer' />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>

                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Get Your Projects Done </h2>
                        <div className="hero-section-content-intro">
                          Professional and top quality service in web development
                        </div>
                      </div>
                      <img className="image" src="/static/images/section-2.jpg" alt='Yurii Donev developer' />
                      <div className="shadow-custom shadow-custom-2">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of Yurii Donev. It's created with SSR server side rendering technology
                  </h1>
                </div>
                <div className="hero-welcome-bio">
                  <h2>
                    To be awared about current application goal, which problem it solves and why SSR is cool follow this <Link href={'/about'}><a>LINK</a></Link>
                  </h2>
                  <h2>
                    Take a look on my work <Link href={'/portfolios'}><a>HERE</a></Link>
                  </h2>
                </div>
                <div className="hero-welcome-text">
                  <h1 className="h1-subheader">
                    My tech stack:
                  </h1>
                </div>
                <Typed
                  loop
                  typeSpeed={60}
                  backSpeed={40}
                  strings={ strings }
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                  className="self-typed"
                />
              </Col>
            </Row>
          </Container>
        </div>
        <a
          className='service-link'
          href="https://www.vecteezy.com/free-vector/programming"
          target="_blank"
        >Programming Vectors by Vecteezy</a>
      </BaseLayout>
    );
  }
}

export default Index;
