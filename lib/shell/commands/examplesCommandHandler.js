/* eslint-disable max-len */

const HELP_MSG =
  '\
  common:\n\
    run QUERY_IDENTIFICATION\n\
  output:\n\
    run ENABLE_OUTPUT\n\
    run DISABLE_OUTPUT\n\
    run GET_VOLTAGE\n\
    run SET_VOLTAGE \'{"voltage": 22.66}\'\n\
    run GET_CURRENT\n\
    run SET_CURRENT \'{"current": 0.250}\'\n\
  measurements:\n\
    run MEASURE_VOLTAGE\n\
    run MEASURE_CURRENT\n\
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
