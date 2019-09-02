import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withUserShop from './withUserShop';
import { makeSelectIsShopSet } from './selectors';

const mapStateToProps = createStructuredSelector({
  isShopSet: makeSelectIsShopSet()
});

const withConnect = connect(mapStateToProps, null);

export default (Component) => compose(withConnect, withUserShop)(Component);
