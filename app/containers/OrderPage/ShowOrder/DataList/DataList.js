import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import './style.scss';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import paginationFactory, {
  PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone
} from 'react-bootstrap-table2-paginator';

const propTypes = {
  data: PropTypes.array
};

const dateFormatter = (cell, row) => {
  const createdAt = moment(row.created_at);
  if (createdAt.isSame(moment(), 'day')) {
    return createdAt.fromNow();
  }
  return createdAt.calendar();
};

const columns = [
  { dataField: 'id', text: 'ID', sort: true },
  { dataField: 'subtotal_price', text: 'Subtotal', sort: true },
  { dataField: 'total_price', text: 'Total', sort: true },
  { dataField: 'marketplace.name', text: 'Marketplace', sort: true },
  {
    dataField: 'created_at', text: 'Date', sort: true, formatter: dateFormatter
  }
];

class DataList extends React.PureComponent {
  onRowClick = (e, row) => {
    console.log('row click');
  };

  render() {
    const { data } = this.props;

    return (
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          totalSize: data.length
        })}
      >
        {
          ({
            paginationProps,
            paginationTableProps
          }) => (
            <>
              <div className="mb-2">
                Show <SizePerPageDropdownStandalone {...paginationProps} /> entries
              </div>

              <BootstrapTable
                bootstrap4
                striped
                bordered={false}
                hover
                classes="mb-0"
                keyField="id"
                data={data}
                columns={columns}
                {...paginationTableProps}
                defaultSorted={[{ dataField: 'id', order: 'desc' }]}
                rowStyle={{ cursor: 'pointer' }}
                rowEvents={{ onClick: this.onRowClick }}
              />

              <Row className="mt-2">
                <Col sm={6} md={6} lg={6} xl={6}>
                  <PaginationTotalStandalone
                    {...paginationProps}
                    paginationTotalRenderer={(from, to, dataSize) => (
                      <span className="react-bootstrap-table-pagination-total">
                        &nbsp;Showing { from } to&nbsp;{ to } of&nbsp;{ dataSize }&nbsp;entries
                      </span>
                    )}
                  />
                </Col>
                <Col sm={6} md={6} lg={6} xl={6} className="text-right">
                  <PaginationListStandalone
                    {...paginationProps}
                  />
                </Col>
              </Row>
            </>
          )
        }
      </PaginationProvider>
    );
  }
}

DataList.propTypes = propTypes;

export default DataList;
