const DB = [];

function saveDB(user) {
    const oldDBSize = DB.length;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject) => {
        if (DB.length > oldDBSize) {
            resolve(user);
        } else {
            reject(new Error("Save DB Error!"));
        }
    });
}

function sendEmail(user) {
    console.log(`email to ${user.email}`);
    return new Promise((resolve) => {
        resolve(user);
    });
}

function getResult(user) {
    return new Promise((resolve, reject) => {
        resolve(`success register ${user.name}`);
    });
}

function registerByPromise(user) {
    // 비동기 호출이지만, 순서를 지켜서 실행
    const result = saveDB(user)
                    .then(sendEmail)
                    .then(getResult)
                    .catch(error => new Error(error))
                    .finally(() => console.log("완료!"));
    // 아직 완료되지 않았으므로 지연(pending)상태
    console.log(result);
    return result;
}

const myUser = { email: "realMan@test.com", passward: "1111", name: "RealMan"};
// const result = registerByPromise(myUser);
// // 결과값이 Promise이므로 then() 메서드에 함수를 넣어서 결괏값을 볼수있다. 
// result.then(console.log);

const allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);