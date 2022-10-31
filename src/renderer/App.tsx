import styled from 'styled-components';
import SideMenu from './components/SideMenu';
import TableViewItem from './components/TableViewItem';
import '@fontsource/kanit';
import useFileBrowserFacade from './facades/useFileBrowserFacade';
import GlobalStyle from './GlobalStyles';

export default function App() {
  const { directory, history, dispatch, items } = useFileBrowserFacade();
  return (
    <>
      <GlobalStyle />
      <TopBar>
        <AppName>File Browser</AppName>
      </TopBar>
      <Wrapper>
        <SideMenu>
          <SideMenuItem
            isActive={directory !== ''}
            onClick={() => dispatch({ type: 'open', payload: '' })}
          >
            {' '}
            My PC{' '}
          </SideMenuItem>
          <SideMenuItem
            isActive={directory !== `${window.api.homeDirectory}\\Documents`}
            onClick={() =>
              dispatch({
                type: 'open',
                payload: `${window.api.homeDirectory}\\Documents`,
              })
            }
          >
            {' '}
            Documents{' '}
          </SideMenuItem>
          <SideMenuItem
            isActive={directory !== `${window.api.homeDirectory}\\Downloads`}
            onClick={() =>
              dispatch({
                type: 'open',
                payload: `${window.api.homeDirectory}\\Downloads`,
              })
            }
          >
            {' '}
            Downloads{' '}
          </SideMenuItem>
          <SideMenuItem
            isActive={directory !== `${window.api.homeDirectory}\\Desktop`}
            onClick={() =>
              dispatch({
                type: 'open',
                payload: `${window.api.homeDirectory}\\Desktop`,
              })
            }
          >
            {' '}
            Desktop{' '}
          </SideMenuItem>
        </SideMenu>
        <ColumnContainer>
          <CurrentLocationText>
            {directory === '' ? 'My PC' : `Current location ${directory}`}
          </CurrentLocationText>
          <ButtonWrapper>
            <StyledButton
              isActive={directory !== ''}
              onClick={() =>
                directory !== '' && dispatch({ type: 'back', payload: '' })
              }
            >
              Back
            </StyledButton>

            <StyledButton
              isActive={history.length !== 0}
              onClick={() =>
                history.length !== 0 &&
                dispatch({ type: 'forward', payload: '' })
              }
            >
              Forward
            </StyledButton>
          </ButtonWrapper>
          <hr />
          <FilesContainer>
            {items.map((item) => (
              <TableViewItem
                directory={directory}
                setDirectory={(path: string) =>
                  dispatch({ type: 'open', payload: path })
                }
                key={item.name}
                name={item.name}
                isDrive={item.isDrive}
                isDirectory={item.isDirectory}
              />
            ))}
          </FilesContainer>
        </ColumnContainer>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  font-family: 'Kanit';
  font-weight: 300;
  min-height: calc(100vh - 32px);
  padding-top: 32px;
  display: flex;
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  flex: 1;
`;

const CurrentLocationText = styled.h3`
  margin: unset;
  font-weight: 300;
  margin-bottom: 24px;
`;

const ButtonWrapper = styled.div`
  height: 32px;
`;

interface ButtonProps {
  isActive: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  border: 2px solid gray;

  background: lightgrey;
  ${({ isActive }) =>
    isActive &&
    `
    border: 2px solid rebeccapurple;
    background: whitesmoke;
    cursor: pointer;
    :hover {
    background-color: #e8dcf8;
  }
  `}
  margin-right: 12px;
  height: 30px;
  width: 80px;
  border-radius: 5px;

  margin-bottom: 24px;
  transition: all ease-in-out 0.3s;
`;

const FilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: calc(100vh - 200px);
  overflow-y: scroll;
  gap: 10px;
`;

const SideMenuItem = styled.button<ButtonProps>`
  width: 100%;
  height: 32px;
  font-family: 'Kanit';
  border: none;

  transition: all ease-in-out 0.3s;
  background-color: rebeccapurple;
  color: whitesmoke;

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #f4effa;
    cursor: pointer;
    color: #161616;
    :hover {
      background: #e8dcf8;
      color: #161616;
  }
  `}
`;

const TopBar = styled.div`
  -webkit-app-region: drag;
  width: 100%;
  height: 32px;
  position: fixed;
  padding-left: 16px;
  background-color: rebeccapurple;
`;

const AppName = styled.h2`
  font-family: 'Kanit';
  margin: unset;
  color: whitesmoke;
  font-weight: 200;
  font-size: 16px;
  line-height: 32px;
`;
