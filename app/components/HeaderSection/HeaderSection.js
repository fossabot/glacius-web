import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';
import './style.scss';

const propTypes = {
  onBackClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

function HeaderSection({
  onBackClick, title, className, children
}) {
  return (
    <Sticky>
      {({ style }) => (
        <div className={`d-flex header-section ${className}`} style={style}>
          <Button color="secondary" className="mr-2 btn-back" onClick={onBackClick}>
            <i className="fas fa-arrow-left fa-fw" />
          </Button>
          <h3 className="d-inline-block header-section-title">{title}</h3>
          {children && (
            <div className="ml-auto header-section-action">
              {children}
            </div>
          )}
        </div>
      )}
    </Sticky>
  );
}

HeaderSection.propTypes = propTypes;

export default HeaderSection;
