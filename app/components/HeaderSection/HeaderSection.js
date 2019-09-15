import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';
import classNames from 'classnames';
import './style.scss';

const defaultProps = {
  onBackClick: () => {},
  shouldShowBackBtn: true
};

const propTypes = {
  onBackClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  shouldShowBackBtn: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

function HeaderSection({
  onBackClick, title, className, shouldShowBackBtn, children
}) {
  const classes = classNames(className, 'd-flex', 'header-section');

  return (
    <Sticky>
      {({ style }) => (
        <div className={classes} style={style}>
          {shouldShowBackBtn && (
            <Button color="secondary" className="mr-2 btn-back" onClick={onBackClick}>
              <i className="fas fa-arrow-left fa-fw" />
            </Button>
          )}
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

HeaderSection.defaultProps = defaultProps;
HeaderSection.propTypes = propTypes;

export default HeaderSection;
