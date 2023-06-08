import { styled } from "styled-components";

export const Container = styled.div`
  height: 50px;
  width: 98.4%;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  align-items: center;
  background: #bfdad7;
  div {
    display: flex;
    button {
      width: 50%;
    }
  }
`;

export const Title = styled.p`
  color: white;
  font-weight: bold;
  margin-left: 24px;
`;

export const Links = styled.div`

  justify-content: space-between;
`;

export const Link = styled.button`
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  text-align: center;
`;