const translatte = require('translatte');

const translateIt = async (text, to_lang) => {
  try {
    const res = await translatte(text, { to: to_lang });
    return res.text;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  translateIt
};
