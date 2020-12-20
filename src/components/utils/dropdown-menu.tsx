import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

const DropdownDiv = styled.div`
  margin-top: 6px;
  width: 160px;
  border: solid 1px ${props => props.theme.gray20};
  margin-left: -100px;
  font-size: 14px;
  background-color: white;
  position: absolute;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${props => props.theme.gray30};
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
  box-shadow: 0px 8px 16px rgba(8, 35, 48, 0.2);
  z-index: 100000000;
`;

const MenuItem = styled.div`
  padding: 17px;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.gray50};
  :hover {
    color: ${props => props.theme.blue20};
    background-color: ${props => props.theme.gray20};
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  margin: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 99999999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropdownMenu = ({ icon, menu, onSelectItem }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div>
      <div
        data-testid='dropdown-menu-click-area'
        onClick={() => {
          setIsDropdownOpen(true);
        }}
      >
        {icon}
      </div>
      {isDropdownOpen && (
        <Wrapper className='w-100'>
          <Backdrop onClick={() => setIsDropdownOpen(false)}></Backdrop>
          <DropdownDiv data-testid='dropdown-menu-dropdown'>
            <Menu
              menu={menu}
              onSelectItem={item => {
                onSelectItem(item);
                setIsDropdownOpen(false);
              }}
            />
          </DropdownDiv>
        </Wrapper>
      )}
    </div>
  );
};

const Menu = ({ menu, onSelectItem }) => {
  return (
    <div>
      {menu.map((item, index) => (
        <MenuItem
          key={index}
          className='d-flex align-items-center'
          onClick={() => {
            onSelectItem(item.value);
          }}
        >
          <div className='mr-1'>{item.icon}</div>
          <div className='ml-2'>{item.label}</div>
        </MenuItem>
      ))}
    </div>
  );
};

export default DropdownMenu;
