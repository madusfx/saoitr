import styled from "styled-components";

type ButtonProps = {
  color?: string;
}

export const Container = styled.button<ButtonProps>`
  width: 50%;
  margin-left: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  ${({ color }) =>
    color === 'primary' &&
    `
      background: teal;
      color: white;
    `
  };
`;