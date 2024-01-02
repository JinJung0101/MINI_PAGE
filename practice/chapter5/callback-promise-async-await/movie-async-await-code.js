import axios from "axios";
// const url = "http://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";
// // 단점: 과도하게 then으로 연결되어있다. 
// axios
//     .get(url)
//     .then((result) => {
//         if (result.status != 200) {
//             throw new Error("요청 실패");
//         }

//         if (result.data) {
//             return result.data;
//         }

//         throw new Error("데이터 없음");
//     })
//     .then((data) => {
//         if (!data.articleList || data.articleList.size == 0) {
//             throw new Error("기사 데이터 없음");
//         }
//         return data.articleList;
//     })
//     .then((results) => {
//         for (let movieinfo of results) {
//             console.log(`[${movieinfo.rank}위] ${movieinfo.title}`);
//         }
//     })
//     .catch((err) => {
//         console.log("<<에러발생>>");
//         console.error(err);
//     });

// await를 사용하기에 async 사용
async function getTop20Movies() { 
    const url = "http://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";
    try {
        // 네트워크에서 데이터를 받아오므로 await로 기다린다. 
        const result = await axios.get(url);
        // result에는 data 프로퍼티가 있다.
        const {data} = result;
        // data 또는 articleList없을 때 예외처리
        if (!data.articleList || data.articleList.size == 0) {
            throw new Error("데이터 없음");
        }
        // data에서 필요한 영화제목, 순위정보 뽑아냄
        const movieinfos = data.articleList.map((article, idx) => {
            return { title: article.title, rank: idx + 1};
        });

        // 데이터 출력
        for (let movieinfo of movieinfos) {
            console.log(`[${movieinfo.rank}위] ${movieinfo.title}`);
        }
    } catch (err) {
        // 예외처리 기존코드와 같게 try catch
        throw new Error(err);
    }
}

getTop20Movies();