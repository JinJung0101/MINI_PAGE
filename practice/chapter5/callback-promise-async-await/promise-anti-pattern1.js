function myWork(work) {
    return new Promise((reslove, reject) => {
        if (work === 'done') {
            reslove('게임 가능');
        } else {
            reject(new Error("게임 불가능"));
        }
    })
}

// callbakc과 다를바없음
myWork('done').then(function(value) { console.log(value)}, function(err) { console.error(err)});

// good
myWork('doing')
        .then(function (value) {console.log(value)})
        .catch(function (err) {console.error(err)});