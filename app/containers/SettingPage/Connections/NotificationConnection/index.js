import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import NotificationConnection from './NotificationConnection';
import { connect as connectAction, disconnect, loadNotification } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectTelegram } from './selectors';

const mapDispatchToProps = (dispatch) => ({
  loadNotification: () => dispatch(loadNotification()),
  connect: (connectionName) => dispatch(connectAction(connectionName)),
  disconnect: (connectionName) => dispatch(disconnect(connectionName))
});

const mapStateToProps = createStructuredSelector({
  telegram: makeSelectTelegram(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'notificationConnection', reducer });
const withSaga = injectSaga({ key: 'notificationConnection', saga });

export default compose(withReducer, withSaga, withConnect)(NotificationConnection);
