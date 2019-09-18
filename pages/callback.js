import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import BasePage from '../components/BasePage.js';

import _ from 'lodash';

import { withRouter } from 'next/router';

import { Auth0Context } from '../services/auth0.js';

class CallbackPage extends Component {

  static contextType = Auth0Context;

  state = {
    auth0Context: null
  }

  componentDidUpdate(prevProps) {

    // console.log('prevProps ', prevProps);

    if (!_.isEqual(this.state.auth0Context, this.context.auth0Client)) {
      this.setState({ auth0Context: this.context.auth0Client });
      this.context.handleRedirectCallback();
      this.props.router.push('/');
    }
  }

  render() {
    return (
      <BaseLayout>
        <BasePage>
          <div> Verifying loading data... </div>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(CallbackPage);


// function (user, context, callback) {
//   user.app._metadata = user.app._metadata || {};
//   var addRolesToUser = function (user, cb) {
//     if (user.email === 'yurii.donev@gmail.com') {
//       cb(null, 'siteOwner');
//     } else {
//       cb(null, 'guest');
//     }
//   };
//
//   addRolesToUser(user, function(err, roles) {
//     if (err) {
//       callback(err);
//     } esle {
//       user.app._metadata.roles = roles;
//       auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
//         .then(function() {
//           callback(null, user, context);
//         })
//         .catch(function(err) {
//           callback(err);
//         })
//     }
//   });
// }


// function (user, context, callback) {
//   if (user.email === 'yurii.donev@gmail.com') {
//   	context.idToken['http://localhost:3000/rules'] = 'siteOwner';
//   } else {
//   	context.idToken['http://localhost:3000/rules'] = 'guest';
//   }
// }
