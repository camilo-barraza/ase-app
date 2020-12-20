import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Wrapper = styled<any>('div')`
  z-index: 10000000000;
  top: 0;
  left: 0;
  width: 100%;
  height: 0px;
  position: fixed;
  display: ${props => {
    return props.open ? 'auto' : 'none';
  }};
`;

const Message = styled<any>('div')`
  padding: 14px;
  top: ${props => {
    return props.open ? '0px' : '-40px';
  }};
  display: ${props => {
    return props.open ? 'auto' : 'none';
  }};
  position: fixed;
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  opacity: ${props => {
    return props.open ? '1' : '0';
  }};
  background: ${props => {
    let color = '#e73737';
    if (props.type === 'success') color = '#48c794';
    if (props.type === 'info') color = '#97a0b2';
    return color;
  }};
  color: white;
  transition: 0.4s;
`;

const Toast = ({ msg, open = false, type = '' }) => {
  return (
    <Wrapper open={open} className='d-flex align-items-center justify-content-center' data-test='toast'>
      <Message open={open} type={type} className='d-flex align-items-center justify-content-center'>
        {msg}
      </Message>
    </Wrapper>
  );
};

export default connect(state => ({
  ...state.toast,
}))(Toast);
