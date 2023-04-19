const CLIENT_ID = "5b40dcfcfcee4a03877c5b392d3e0d07";
const CLIENT_SECRET = "2abb5a9d7d6e4de980c68f7e156a4ea6";

const authParameters = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
};

export default authParameters;
