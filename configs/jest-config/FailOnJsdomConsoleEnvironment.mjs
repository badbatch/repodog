import JSDOMEnvironment from 'jest-environment-jsdom';

// Required for Jest
// eslint-disable-next-line import-x/no-default-export
export default class FailOnJsdomConsoleEnvironment extends JSDOMEnvironment {
  jsdomFailure = undefined;

  constructor(config, context) {
    super(config, context);

    this.dom.virtualConsole.on('error', error => {
      this.jsdomFailure = error instanceof Error ? error : new Error(String(error));
    });

    this.dom.virtualConsole.on('warn', message => {
      this.jsdomFailure = new Error(`jsdom warning: ${message}`);
    });

    this.dom.virtualConsole.on('jsdomError', error => {
      this.jsdomFailure = error;
    });
  }

  async handleTestEvent(event) {
    if (event.name === 'test_done' && this.jsdomFailure) {
      throw this.jsdomFailure;
    }
  }
}
