import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'reactstrap';
import { getEcho } from 'utils/echo';
import { cloneDeep } from 'lodash';
import EmptyState from './EmptyState';
import DataList from './DataList';
import 'pusher-js';

const propTypes = {
  loadOrderData: PropTypes.func,
  storeOrderData: PropTypes.func,
  orderData: PropTypes.array,
  userShop: PropTypes.object,
};

class ShowOrder extends React.PureComponent {
  constructor(props) {
    super(props);

    this.echo = getEcho();
  }

  componentDidMount() {
    const {
      userShop: { id }, loadOrderData, storeOrderData
    } = this.props;

    loadOrderData();

    this.echo.private(`App.Shop.${id}`)
      .notification((notification) => {
        const { orderData } = this.props;

        const clonedOrderData = cloneDeep(orderData);

        const isOrderDataFound = clonedOrderData.find((item, index) => {
          if (item.id === notification.order.id) {
            clonedOrderData[index] = notification.order;
            return true;
          }
          return false;
        });

        if (!isOrderDataFound) {
          clonedOrderData.push(notification.order);
        }

        storeOrderData(clonedOrderData);
        console.log('new order received');
      });
  }

  componentWillUnmount() {
    const { userShop: { id } } = this.props;

    this.echo.leave(`App.Shop.${id}`);
  }

  render() {
    const { orderData } = this.props;

    // empty state
    if (!orderData.length) {
      return <EmptyState />;
    }

    return (
      <Card body>
        <DataList data={orderData} />
      </Card>
    );
  }
}

ShowOrder.propTypes = propTypes;

export default ShowOrder;
