import styled from 'styled-components';

interface SideMenuProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function SideMenu({ children }: SideMenuProps) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 250px;
  padding-top: 24px;
  height: inherit;

  display: flex;
  flex-direction: column;

  border-right: 2px solid rebeccapurple;
`;
