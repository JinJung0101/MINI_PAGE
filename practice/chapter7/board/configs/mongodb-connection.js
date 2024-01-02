const { MongoClient } =  require("mongodb");
// mongoDB 연결 주소
const uri = "mongodb+srv://qwe5344641:1q2w3e4r5t@cluster0.3vwuqmt.mongodb.net/";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};