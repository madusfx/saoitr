import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #cce2e4;
`;

export const Card = styled.div`
  left: calc(50% - 30rem / 2);
  top: calc(50% - 20rem / 2);
  display: block;
  position: fixed;
  align-items: center;
  padding: 3rem;
  border-radius: 6px;
  width: 30rem;
  height: 20rem;
  background: #bfdad7;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.p`
  font-size: 32px;
  color: white;
  text-align: center;
`;

export const Input = styled.input`
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  margin-top: 12px;
`;

export const Button = styled.button`
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  margin-top: 24px;
`;

export const Register = styled.button`
  margin-top: 1rem;
  border: none;
  background: none;
  div {
    margin-top: 2px;
    color: teal;
    cursor: pointer;
  }
`;