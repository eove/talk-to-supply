/* eslint-disable max-len */

const HELP_MSG =
  '\
  common:\n\
    run QUERY_IDENTIFICATION\n\
  voltage:\n\
    run SET_VOLTAGE \'{"voltage": 22.66}\'\n\
  \n';

function create() {
  return {
    handle: (run, callback) => {
      console.log(HELP_MSG);
      callback();
    }
  };
}

module.exports = create;
