const axios = require("axios");
const config = require("../app.config.json");

const prefix = `${config.server}/techhypeserver`;

const rest = {
  get: async (url, params = {}) => {
    try {
      const res = await axios.get(`${prefix}${url}`, { params: params });
      return [res, null];
    } catch (err) {
      return [null, err];
    }
  },
};

module.exports = rest;
