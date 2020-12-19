import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isExternal from 'is-url-external';

/**
 * Надстройка для React-Route-NavLink, различающая внешние и внутренние ссылки
 * @class LinkDuo
 * @author Ryan Florence (@ryanflorence)
 * @extends React.Component
 */
export default class LinkDuo extends Component {
  render() {
    return isExternal(this.props.to) ?
      <a
        href={this.props.to} target='_blank' rel='noreferrer'
        {...this.props}
      />
      :
      <Link {...this.props} />;
  }
}
