declare global {
  interface FileModel {
    name: string;
    isDirectory: boolean;
    isDrive?: boolean;
  }
  interface Window {
    api: {
      directoryContents: (callback: string) => FileModel[];
      homeDirectory: string;
      openFile: (path: string, name: string) => void;
      drivesList: () => { caption: string }[];
    };
  }
}

export {};
