import { MongoClient } from 'mongodb';
const url = "mongodb+srv://qwe5344641:1q2w3e4r5t@cluster0.3vwuqmt.mongodb.net/";

// MongoClinet생성
const client = new MongoClient(url, {useNewUrlParser: true});

async function main() {
    try {
        // 커넥션을 생성, 연결시도
        await client.connect();

        console.log('MongoDB 접속 성공');

        // test DB의 person collection가져오기
        const collection = client.db('test').collection('person');

        // 문서 하나 추가
        await collection.insertOne({ name: 'REAL MAN', age: 99});
        console.log('추가 완료');
        // 문서 찾기
        const documents = await collection.find({name: 'REAL MAN'}).toArray();
        console.log('찾은 문서:', documents);
        // 문서 갱신
        await collection.updateOne({name: 'REAL MAN'}, {$set: {age: 31}});
        console.log('update complete');
        // 갱신된 문서 확인
        const updatedDocuments = await collection.find({name: 'REAL MAN'}).toArray();
        console.log('updated Document:', updatedDocuments);

        // 문서 삭제
        // await collection.deleteOne({name: 'REAL MAN'});
        // console.log('문서 삭제');
        // 연결 끊기
        await client.close();
    } catch (err) {
        console.log(err);
    }
}

main();