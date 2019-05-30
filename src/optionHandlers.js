'use strict';

function commaSeparatedList (inputStr) {
  const str = inputStr || null;
  const list = (str ? str.split(',') : []);
  return list.map(item => item.trim());
}

module.exports = {
	commaSeparatedList,
};
