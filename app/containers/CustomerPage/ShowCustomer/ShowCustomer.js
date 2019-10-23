import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'reactstrap';
import { getEcho } from 'utils/echo';
import { cloneDeep } from 'lodash';
import EmptyState from './EmptyState';
import DataList from './DataList';
import 'pusher-js';

const propTypes = {
  loadCustomerData: PropTypes.func,
  storeCustomerData: PropTypes.func,
  customerData: PropTypes.array,
  userShop: PropTypes.object,
};

class ShowCustomer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.echo = getEcho();
  }

  componentDidMount() {
    const {
      userShop: { id }, loadCustomerData, storeCustomerData
    } = this.props;

    loadCustomerData();

    this.echo.private(`App.Shop.${id}`)
      .notification((notification) => {
        const { customerData } = this.props;

        const clonedCustomerData = cloneDeep(customerData);

        const isCustomerDataFound = clonedCustomerData.find((item, index) => {
          if (item.id === notification.customer.id) {
            clonedCustomerData[index] = notification.customer;
            return true;
          }
          return false;
        });

        if (!isCustomerDataFound) {
          clonedCustomerData.push(notification.customer);
        }

        storeCustomerData(clonedCustomerData);
        console.log('new customer received');
      });
  }

  componentWillUnmount() {
    const { userShop: { id } } = this.props;

    this.echo.leave(`App.Shop.${id}`);
  }

  render() {
    const { customerData } = this.props;

    // empty state
    if (!customerData.length) {
      return <EmptyState />;
    }

    return (
      <Card body>
        <DataList data={customerData} />
      </Card>
    );
  }
}

ShowCustomer.propTypes = propTypes;

export default ShowCustomer;
