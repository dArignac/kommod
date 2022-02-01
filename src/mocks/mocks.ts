export default function mockWindow() {
  Object.defineProperty(window, 'electron', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: {
      ipcRenderer: {
        getToken: () => 'dummy-token',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setToken: (_name: string, _value: string) => {},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        once: (_channel: string, _func: (_arg: string) => void) => {},
      },
    },
  });
}
