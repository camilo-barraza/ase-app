import styled from 'styled-components';

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  :focus {
    outline: none;
  }
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const Icon = styled<any>('div')`
  color: ${props => (props.color ? props.color : props.theme.blue20)};
  user-select: none;
  font-size: 18px;
  margin-left: 10px;
  height: ${props => (props.size ? props.size : '36px')};
  width: ${props => (props.size ? props.size : '36px')};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  :hover {
    background-color: ${props => props.theme.gray20};
    cursor: pointer;
  }
`;

export const ConfirmButton = styled(Button)`
  height: 40px;
  padding: 0 20px;
  font-size: 13px;
  border-radius: 3px;
  box-shadow: 0 4px 5px 0 rgba(16, 31, 60, 0.1);
  background-color: ${props => props.theme.colors.primary};
  font-weight: bold;
  color: white;
`;

export const CancelButton = styled(Button)`
  height: 40px;
  width: 100px;
  border-radius: 3px;
  border: solid 1.1px ${props => props.theme.purple30};
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.purple30};
`;
