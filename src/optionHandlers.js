'use strict';

function commaSeparatedList (inputStr, defaultStr = null) {
  const str = inputStr || defaultStr || null;
  const list = (str ? str.split(',') : []);
  return list.map(item => item.trim());
}

module.exports = {
	commaSeparatedList,
};
