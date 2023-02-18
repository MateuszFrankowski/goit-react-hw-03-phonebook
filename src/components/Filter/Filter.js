import PropTypes from 'prop-types';
import css from './Filter.module.css';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
export class Filter extends Component {
  filterId = nanoid();

  render() {
    const { onChange } = this.props;
    return (
      <div className={css.filter}>
        <label htmlFor={this.filterId}>Find Contact By Name</label>
        <input
          id={this.filterId}
          type="text"
          name="filter"
          onChange={onChange}
        />
      </div>
    );
  }
}

Filter.propTypes = { onChange: PropTypes.func };
