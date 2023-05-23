import styled from "styled-components";

type ButtonProps = {
  color?: string;
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  button {
    width: 100%;
  }
`;