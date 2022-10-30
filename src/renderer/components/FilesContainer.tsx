import React from 'react';
import styled from 'styled-components';

interface FilesContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function FilesContainer({ children }: FilesContainerProps) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
