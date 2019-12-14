import styled from 'styled-components';

export const StyledButtonBlock = styled.section`
  .button-list {
    > li {
      padding: ${props => props.theme.scpx(5)} ${props => props.theme.scpx(15)};
    }
  }
`;
