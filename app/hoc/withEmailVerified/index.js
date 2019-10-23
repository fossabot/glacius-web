import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectIsEmailVerified } from 'containers/App/selectors';
import withEmailVerified from './withEmailVerified';

const mapStateToProps = createStructuredSelector({
  isEmailVerified: makeSelectIsEmailVerified()
});

const withConnect = connect(mapStateToProps, null);

export default (Component) => compose(withConnect, withEmailVerified)(Component);
