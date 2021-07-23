import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PulseView from '../screens/PulseView';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={PulseView} />
    </Switch>
  );
};

const mapStateStore = (state) => {
  return {
    location: state.router.location,
  };
};

const mapStateFunc = { navigatePush: push };

Router.propTypes = {
  location: PropTypes.object.isRequired,
};

export default connect(mapStateStore, mapStateFunc)(Router);
