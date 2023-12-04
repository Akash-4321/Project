const Models = require("../models");

var apiKeyAuthVerify = async function (req, res, next) {
    let resBody = { success: false },
    reqBody = req.body,    
    apiKeyHead = req.header("X-Api-Key") || reqBody.api_key;
    if (!apiKeyHead) {
      resBody.message = "API Key authentication header required";
      return res.status(401).json(resBody); 
    }
    let user = await Models.User.findOne({ api_key: apiKeyHead });        
    if (!user) {
      resBody.message = "Invalid API Key authentication header provided";
      return res.status(401).json(resBody); 
    }
    try {
      res.user = user;
      await next(); 
    } catch (err) {
      resBody.message = "Internal Server Error, Please try again";
      res.body = resBody;
    }
}
module.exports = {
  apiKeyAuth: apiKeyAuthVerify,
};