import styled from "styled-components";

export const DivWithoutScrollBar = styled.div`
  &::-webkit-scrollbar {
    appearance: none;
    // display: none;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
  }
`;
