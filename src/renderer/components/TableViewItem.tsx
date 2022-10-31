import styled from 'styled-components';
import DriveIcon from './DriveIcon';
import FileIcon from './FileIcon';
import FolderIcon from './FolderIcon';

interface TableViewItemProps {
  name: string;
  isDirectory: boolean;
  directory: string;
  isDrive?: boolean;
  setDirectory: (path: string) => void;
}

export default function TableViewItem({
  name,
  isDirectory,
  directory,
  isDrive = false,
  setDirectory,
}: TableViewItemProps) {
  const newPath =
    directory.at(-1) === '\\' ? directory + name : `${directory}\\${name}`;
  const openItem = () => {
    if (isDrive === true) {
      setDirectory(`${name}\\`);
    } else if (isDirectory === true) {
      setDirectory(newPath);
    } else {
      window.api.openFile(directory, name);
    }
  };
  return (
    <Container onDoubleClick={openItem}>
      {
        // eslint-disable-next-line no-nested-ternary
        isDrive ? <DriveIcon /> : isDirectory ? <FolderIcon /> : <FileIcon />
      }
      <NameText>
        {name.substring(0, 12).concat(name.length > 15 ? '...' : '')}
      </NameText>{' '}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  transition: all ease-in-out 0.3s;
  :hover {
    background-color: #e8dcf8;
  }
`;

const NameText = styled.p`
  font-size: 15px;
  user-select: none;
  -webkit-user-select: none;
  color: #161616;
  margin: unset;
`;
