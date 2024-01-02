// const { MongoClient } = require('mongodb');
import { MongoClient } from 'mongodb';


const url = "mongodb+srv://qwe5344641:1q2w3e4r5t@cluster0.3vwuqmt.mongodb.net/";

const client = new MongoClient(url);
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     client.close();
// });

// async가 있으므로 비동기 처리 함수
async function run() {
    await client.connect();
    // admin DB 인스턴스
    const adminDB = client.db('test').admin();
    // DB정보 가져오기
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);
    return "REAL MAN";
}

// 실행함수
run()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());