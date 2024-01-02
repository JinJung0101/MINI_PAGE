function myWork(work) {
    return new Promise((reslove, reject) => {
        reslove(work.toUpperCase())
    })
}

function playGame(work) {
    return new Promise((reslove, reject) => {
        if (work === 'DONE') {
            reslove('GO PLAY GAME');
        } else {
            reject(new Error("DON'T"));
        }
    })
}

// Promise 중첩 사용
myWork('done')
        .then(function(result) {
            playGame(result).then(function(val) {
                console.log(val);
            });
        })

//결과 then으로 넘김
myWork('done')
        .then(playGame)
        .then(console.log)