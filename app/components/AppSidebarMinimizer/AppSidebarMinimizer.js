import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setSideBarOpt, getSideBarOpt } from 'utils/localStorage';
import LayoutHelper from '@coreui/react/lib/Shared/layout/layout';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  type: PropTypes.string
};

const defaultProps = {
  tag: 'button',
  type: 'button'
};

class AppSidebarMinimizer extends React.Component {
  componentDidMount() {
    const isMinimized = document.body.classList.contains('sidebar-minimized');
    LayoutHelper.sidebarPSToggle(!isMinimized);
  }

  handleClick = () => {
    LayoutHelper.sidebarToggle();

    // custom method which save sidebar state to local storage
    const isMinimized = document.body.classList.contains('sidebar-minimized');
    setSideBarOpt({ ...getSideBarOpt(), isMinimized });
  };

  render() {
    const {
      className, children, tag: Tag, type, ...attributes
    } = this.props;

    const classes = classNames(className, 'sidebar-minimizer', 'mt-auto');

    return (
      <Tag className={classes} type={type} {...attributes} onClick={this.handleClick}>
        {children}
      </Tag>
    );
  }
}

AppSidebarMinimizer.propTypes = propTypes;
AppSidebarMinimizer.defaultProps = defaultProps;

export default AppSidebarMinimizer;
