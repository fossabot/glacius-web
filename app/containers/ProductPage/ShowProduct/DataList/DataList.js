import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import './style.scss';

const propTypes = {
  data: PropTypes.array,
  navigateToEditProduct: PropTypes.func
};

const columns = [
  { dataField: 'id', text: 'ID', sort: true },
  { dataField: 'productName', text: 'Name', sort: true },
  { dataField: 'productPrice', text: 'Price', sort: true },
];

class DataList extends React.PureComponent {
  onRowClick = (e, row) => {
    const { navigateToEditProduct } = this.props;

    navigateToEditProduct(row.id);
  };

  render() {
    const { data } = this.props;

    return (
      <BootstrapTable
        bootstrap4
        striped
        bordered={false}
        hover
        classes="mb-0"
        keyField="id"
        data={data}
        columns={columns}
        rowStyle={{ cursor: 'pointer' }}
        rowEvents={{ onClick: this.onRowClick }}
      />
    );
  }
}

DataList.propTypes = propTypes;

export default DataList;
