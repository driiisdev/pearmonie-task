const axios = require('axios');

exports.convertCurrency = async (amount, from, to) => {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const rate = response.data.rates[to];
    return amount * rate;
  } catch (error) {
    throw new Error('Currency conversion failed');
  }
};
