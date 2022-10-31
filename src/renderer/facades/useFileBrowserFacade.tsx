import { useState, useEffect, useReducer } from 'react';

interface BrowserStateModel {
  directory: string;
  history: string[];
}

interface ActionModel {
  type: string;
  payload: string;
}

export default function useFileBrowserFacade() {
  const initialBrowserState = {
    directory: '',
    history: [],
  };

  function reducer(
    state: BrowserStateModel,
    action: ActionModel
  ): BrowserStateModel {
    const history = JSON.parse(JSON.stringify(state.history));
    switch (action.type) {
      case 'forward': {
        const nextDir = history.shift();
        return { directory: nextDir, history };
      }
      case 'back': {
        history.unshift(state.directory);
        const targetDirectory = state.directory.split('\\');
        if (targetDirectory[1] === '') {
          return { directory: '', history };
        }

        targetDirectory.pop();
        if (targetDirectory.length > 1) {
          const dir = targetDirectory.join('\\');
          return { directory: dir, history };
        }
        const dir = `${targetDirectory[0]}\\`;
        return { directory: dir, history };
      }
      case 'open':
        return { directory: action.payload, history: [] };

      default:
        throw new Error();
    }
  }
  const [items, setItems] = useState<FileModel[]>([]);
  const [{ directory, history }, dispatch] = useReducer(
    reducer,
    initialBrowserState
  );
  useEffect(() => {
    const updateFiles = async (directoryPath: string) => {
      if (directory === '') {
        try {
          const data = await window.api.drivesList();
          const drivesDirectories = data.map((drive) => {
            return { name: drive.caption, isDirectory: false, isDrive: true };
          });
          setItems(drivesDirectories);
        } catch {
          // eslint-disable-next-line no-console
          console.error('Error getting drives');
        }
      } else {
        try {
          const filesData = await window.api.directoryContents(directoryPath);
          setItems(filesData);
        } catch {
          dispatch({ type: 'back', payload: '' });
          // eslint-disable-next-line no-console
          console.error('Error getting files');
        }
      }
    };
    const interval = setInterval(() => updateFiles(directory), 5000);
    updateFiles(directory);
    return () => clearInterval(interval);
  }, [directory]);
  return { directory, history, dispatch, items };
}
