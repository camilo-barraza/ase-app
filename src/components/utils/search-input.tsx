import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Spinner from './spinner';

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownDiv = styled<any>('div')`
  background-color: white;
  position: absolute;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  max-height: 260px;
  overflow-y: auto;
  z-index: 100000000;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #dfe1e3;
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
  box-shadow: 0px 8px 16px rgba(8, 35, 48, 0.2);
`;

const InputWrapper = styled<any>('div')`
  box-sizing: border-box;
  height: 42px;
  width: 100%;
`;

const MenuItem = styled<any>('div')`
  height: 36px;
  font-size: 14px;
  font-weight: 500;
  padding-right: 10px;
  color: ${props => props.theme.gray55};
  :hover {
    cursor: pointer;
    color: ${props => props.theme.blue20};
    background-color: ${props => props.theme.gray20};
  }
`;

const Container = styled<any>('div')`
  font-size: 13px;
`;

const Input = styled<any>('input')`
  position: absolute;
  width: 100%;
  height: 42px;
  padding-left: 15px;
  font-size: 15px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  padding-right: 30px;
  border: 1px solid ${props => props.theme.gray30};
  border-bottom: 2px solid ${props => props.theme.gray30};
  background-color: ${props => props.theme.gray10};
  outline: none;
  font-weight: 600;
  color: ${props => props.theme.gray55};
  ${props => {
    return !props.dropdownOpen
      ? `
      cursor:pointer; 
    `
      : `
      border-bottom: 2px solid ${props.theme.blue20};
      `;
  }};
  :hover {
    border-bottom: 2px solid ${props => props.theme.blue20};
  }
`;

const MenuItemText = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  margin: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 99999999;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DefaultDiv = styled.div`
  padding: 30px;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.gray55};
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SearchInput = ({ placeholder = '', menu = [], isLoading = false, onChange, onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [onChangeInputTimeout, setOnChangeInputTimeout] = useState(null);
  const inputRef = useRef(null);

  // used to improve performance while typing
  const onInputChange = evt => {
    clearInterval(onChangeInputTimeout);
    const interval = setTimeout(() => {
      onChange(evt.target.value);
    }, 300);
    setOnChangeInputTimeout(interval);
  };

  const onSelectMenuOption = option => {
    onSelect(option.value);
    inputRef.current.value = option.label;
    setIsDropdownOpen(false);
  };

  return (
    <Container className='w-100'>
      <InputWrapper
        onClick={() => {
          setIsDropdownOpen(true);
        }}
        dropdownOpen={isDropdownOpen}
        className='w-100 position-relative d-flex align-items-center justify-content-between'
      >
        <Input
          ref={inputRef}
          placeholder={placeholder}
          type='text'
          dropdownOpen={isDropdownOpen}
          onChange={onInputChange}
        />
      </InputWrapper>
      {isDropdownOpen && (
        <DropdownWrapper className='w-100'>
          <Backdrop onClick={() => setIsDropdownOpen(false)}></Backdrop>
          <DropdownDiv className='w-100'>
            {isLoading && (
              <DefaultDiv>
                <Spinner />
              </DefaultDiv>
            )}
            {!isLoading && menu.length > 0 && <Menu menu={menu} onSelect={onSelectMenuOption} />}
            {!isLoading && menu.length === 0 && <DefaultDiv>No results found</DefaultDiv>}
          </DropdownDiv>
        </DropdownWrapper>
      )}
    </Container>
  );
};

const Menu = ({ menu, onSelect }) => {
  return (
    <div>
      {menu.map((menuOption, index) => {
        return (
          <MenuItem
            key={index}
            className='position-relative d-flex align-items-center'
            onClick={() => {
              onSelect(menuOption);
            }}
          >
            <MenuItemText className='ml-3' title={menuOption.label}>
              {menuOption.label}
            </MenuItemText>
          </MenuItem>
        );
      })}
    </div>
  );
};

export default SearchInput;
