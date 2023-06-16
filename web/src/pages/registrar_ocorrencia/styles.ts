import { styled } from "styled-components";

export const Select = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  p {
    font-size: 14px;
    color: white;
  }
  select {
    width: 100%;
    border: none;
    border-radius: 6px;
    padding: 0.5rem;
  }
`;

export const RegisteredAt = styled.div`
  display: flex;
  justify-content: space-between;
  input {
    width: 80%;
  }
`;