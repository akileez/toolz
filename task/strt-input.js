/*
  Input connector task for Start, helps to pass data through different tasks runners.
    import Start from 'start';
    import reporter from 'start-pretty-reporter';
    import files from 'start-files';
    import inputConnector from 'start-input-connector';
    import eslint from 'start-eslint';

    const start = Start(reporter());

    function lint(input) {
        return start(
            inputConnector(input),
            eslint()
        );
    }

    export function lintLib() {
        return start(
            files([ 'lib/** /*.js' ]), <-- space due to comments
            lint
        );
    }

    export function lintTest() {
        return start(
            files([ 'test/** /*.js' ]), <-- space due to comments
            lint
        );
    }

*/

function connection (input) {
  return () => {
    return function inputConnector () {
      return Promise.resolve(input)
    }
  }
}

module.exports = connection
