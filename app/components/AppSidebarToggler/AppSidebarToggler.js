import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setSideBarOpt, getSideBarOpt } from 'utils/localStorage';
import { sidebarCssClasses, validBreakpoints, checkBreakpoint } from '@coreui/react/lib/Shared/index';
import toggleClasses from '@coreui/react/lib/Shared/toggle-classes';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  display: PropTypes.any,
  mobile: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  type: PropTypes.string
};

const defaultProps = {
  display: 'lg',
  mobile: false,
  tag: 'button',
  type: 'button'
};

class AppSidebarToggler extends Component {
  constructor(props) {
    super(props);
    this.sidebarToggle = this.sidebarToggle.bind(this);
  }

  sidebarToggle(e) {
    e.preventDefault();
    this.toggle();
  }

  toggle(force) {
    const { display, mobile } = this.props;
    let cssClass = sidebarCssClasses[0];
    if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
      cssClass = `sidebar-${display}-show`;
    }
    toggleClasses(cssClass, sidebarCssClasses, force);

    // custom method which save sidebar state to local storage
    if (!mobile) {
      const isHidden = !document.body.classList.contains('sidebar-lg-show');
      setSideBarOpt({ ...getSideBarOpt(), isHidden });
    }
  }

  render() {
    const {
      className, children, tag: Tag, ...attributes
    } = this.props;

    delete attributes.mobile;
    delete attributes.display;

    const classes = classNames(className, 'navbar-toggler');

    return (
      <Tag type="button" className={classes} {...attributes} onClick={(event) => this.sidebarToggle(event)} data-sidebar-toggler>
        {children || <span className="navbar-toggler-icon" />}
      </Tag>
    );
  }
}

AppSidebarToggler.propTypes = propTypes;
AppSidebarToggler.defaultProps = defaultProps;

export default AppSidebarToggler;
