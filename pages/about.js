import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import { Col, Row } from 'reactstrap';

import BasePage from '../components/BasePage.js';

class About extends Component {

  render() {
    return (
      <BaseLayout title={'About Yurii Donev'}>
        <BasePage className='about-page'>
          <Row className="mt-5">
            <Col md="12">
              <div className='page-header'>
                <h1 className='page-header-title'>Why SSR is cool?</h1>
              </div>

              <div className="fadein" id="intro">
                <h2>
                  <b>
                    Differences between pure React application and React application with SSR (server side rendering) technology
                  </b>
                </h2>
                <p>
                  Let's imagine that the data in your pure React application is quite valuable and you want to make it available to others.
                  The best way to do this is to rank high in Google’s search results, so that other people can find your data as quickly and easily as possible.
                </p>
                <p>
                  But using pure React, you will be very disappointed, and here's why: the image below shows a fragment of the simple
                  React application with some data
                </p>
                <div className='about-img-container'>
                  <img src='/static/images/about_ssr/info.JPG' alt='' />
                </div>
                <p>
                  Now let's imagine that you are Google Bot (Google SEO robot) and you want to go to this application in order to read valuable information, to show it in your results.
                </p>
                <p>
                  We can imitate Google Bot's visit to our application this way:
                  right click and select "View page source" in the menu
                </p>
                <div className='about-img-container'>
                  <img src='/static/images/about_ssr/view_page_source.JPG' alt='' />
                </div>
                <p>
                  In the above image we can see here HTML page that the server gave us on our request. Only empty root DIV element present and no data at all.
                  Google Bot sees the same!
                </p>
                <p>
                  {
                    'You may be wondering: so how does the data still get on the screen? Answer is: data is rendered using React, which runs in the <script> tag. React can either already contain this info in a script, or even make a request to the server to get it asynchronously. Upon receiving it, React will display it on the screen.'
                  }
                </p>
                <p>
                  But as you understand, Google SEO robot will not wait in both of the above cases. He will come in, see that there is no information
                  and go on to the next site. Your data will remain unreachable for Google.
                </p>
                <p>
                  So what to do - you ask, how can I make my React app reachable for SEO?
                  Solution is <a href='https://nextjs.org/features/server-side-rendering' target='_blank' rel='nofollow'><b>Server Side Rendering (SSR)</b></a> technology
                </p>
                <p>
                  SSR technology allows you to render the application on the server side and send to your request an html page already filled with your data, look at the picture below:
                </p>
                <div className='about-img-container'>
                  <img src='/static/images/about_ssr/view_page_source_info.JPG' alt='' />
                </div>
                <p>Here you can see the HTML page already filled with some data</p>
                <p>
                  The application itself is still executed with React, but now Google SEO robot can collect your data to display it as a result of the search.
                  And at the same time, you can still use the React library with all its modern features.
                  Isn't that cool?
                </p>
              </div>

              <div className="fadein" id="intro">
                <h2>
                  <b>
                    Current application goal
                  </b>
                </h2>
                <ul>
                  <li>
                    <p>
                      To demonstrate the capabilities of SSR technology
                    </p>
                  </li>
                  <li>
                    <p>
                      To create a convenient portfolio website. To gather information about projects in one place
                    </p>
                  </li>
                  <li>
                    <p>
                      To demonstrate my projects and skills to a potential Customer. What benefits a Сustomer can get from my work
                    </p>
                  </li>
                </ul>
              </div>

              <div className="fadein" id="intro">
                <h2>
                  <b>
                    Tech stack
                  </b>
                </h2>
                <ul>
                  <li>
                    <p>
                      <b>Front-end:</b> <a href='https://reactjs.org' target='_blank' rel='nofollow'>React.js</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Back-end: </b>
                      <a href='https://nextjs.org' target='_blank' rel='nofollow'>Next.js</a> + <a href='https://nodejs.org' target='_blank' rel='nofollow'>Node.js</a> + <a href='https://expressjs.com' target='_blank' rel='nofollow'>Express.js</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Database:</b> <a href='https://www.mongodb.com/cloud/atlas' target='_blank' rel='nofollow'>mongo DB Atlas Cluster</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Authentication and authorization:</b> <a href='https://auth0.com' target='_blank' rel='nofollow'>Auth0</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Styling: </b>
                      <a href='https://sass-lang.com' target='_blank' rel='nofollow'>SCSS SASS</a> + <a href='https://reactstrap.github.io' target='_blank' rel='nofollow'>Bootstrap</a>
                    </p>
                  </li>
                </ul>
              </div>

              <div className="fadein" id="intro">
                <h2>
                  <b>
                    Contact me:
                  </b>
                </h2>
                <ul>
                  <li>
                    <p>
                      <b>Linkedin:</b> <a href='https://www.linkedin.com/in/yurii-donev-8a874110a' target='_blank' rel='nofollow'>My Profile</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Email:</b> <a href="mailto:yurii.donev@gmail.com">yurii.donev@gmail.com</a>
                    </p>
                  </li>
                </ul>
              </div>

            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
