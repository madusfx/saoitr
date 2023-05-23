import { styled } from "styled-components";

export const Container = styled.div`
  left: calc(50% - 40% / 2);
  top: calc(50% - 26rem / 2);
  display: block;
  position: fixed;
  align-items: center;
  padding: 3rem;
  border-radius: 6px;
  width: 40%;
  background: #bfdad7;
  height: 26rem;
  form {
    display: flex;
    flex-direction: column;
  }
  button {
    margin-top: 24px;
  }
`;

export const Title = styled.p`
  font-size: 32px;
  color: white;
  text-align: center;
`;