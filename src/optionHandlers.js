'use strict';

function commaSeparatedList (inputStr, defaultStr = null) {
  const str = inputStr || defaultStr || null;
  return (str ? str.split(',') : []);
}

module.exports = {
	commaSeparatedList,
};
