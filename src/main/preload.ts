import { Dirent } from 'fs';

const { readdir } = require('fs/promises');
const { contextBridge, shell } = require('electron');
const { lsDevices } = require('fs-hard-drive');

const homeDirectory = require('os').homedir();

const directoryContents = async (path: string) => {
  const results = await readdir(path, { withFileTypes: true });
  return results.map((entry: Dirent) => ({
    name: entry.name,
    isDirectory: entry.isDirectory(),
  }));
};

const openFile = async (path: string, name: string) => {
  const url = `${path}\\${name}`;
  try {
    await shell.openExternal(url);
  } catch {
    // eslint-disable-next-line no-console
    console.error('Failed to load file');
  }
};

const drivesList = async () => {
  const drives = await lsDevices();
  return drives;
};

contextBridge.exposeInMainWorld('api', {
  directoryContents,
  homeDirectory,
  openFile,
  drivesList,
});
