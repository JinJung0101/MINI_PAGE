const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const postService = require("./services/post-service");

// req.body와 POST 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// mongodb 연결 함수
const mongodbConnection = require("./configs/mongodb-connection");
const { ObjectId } = require("mongodb");

// templete engine으로 handlebar등록
app.engine(
    "handlebars", 
    handlebars.create({
        // handlebar 생성 및 엔진 반환
        helpers: require("./configs/handlebars-helpers"),
    }).engine,
);
// 웹 페이지 로드시 사용할 templete engine 설정
app.set("view engine", "handlebars");
// view 디렉터리를 views로 설정
app.set("views", __dirname + "/views");

// 라우터 설정
// 리스트 페이지
app.get("/", async(req, res) => {
    // 현재 페이지 데이터
    const page = parseInt(req.query.page) || 1; 
    // 검색어 데이터
    const search = req.query.search || "";
    try {
        // postService.list에서 글 목록과 페이지네이터를 가져옴
        const [posts, paginator] = await postService.list(collection, page, search);
        // 리스트 페이지 렌더링
        res.render("home", { title: "테스트 게시판", search, paginator, posts }); 
    } catch (error) {
        console.error(error);
        res.render("home", { title: "테스트 게시판 "});
        // error인 경우 빈 값으로 렌더링
    }
});

// 쓰기 페이지 이동
app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판", mode: "create"});
});

// 수정 페이지로 이동 mode는 modify
app.get("/modify/:id", async (req, res) => {
    // getPostById() 함수로 게시글 데이터를 받아옴
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", { title: "테스트 게시판", mode: "modify", post });
});

// 게시글 수정 API
app.post("/modify/", async (req, res) => {
    const { id, title, writer, password, content } = req.body;
    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString(),
    };
    // 업데이트 결과, try, catch로 실패시 처리 추가 해야함
    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});

// 글쓰기
app.post("/write", async (req, res) => {
    const post = req.body;
    // 글쓰기 후 결과 반환
    const result = await postService.writePost(collection, post);
    // 생성된 도큐먼트의 _id를 사용해 상세페이지로 이동
    res.redirect(`/detail/${result.insertedId}`);
});

// 상세페이지 이동
app.get("/detail/:id", async(req, res) => {
    // 게시글 정보 가져오기
    console.log("이게 아이디다.",req.params.id);
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    });
});

// 패스워드 체크
app.post("/check-password", async(req, res) => {
    const { id, password } = req.body;
    // postService의 getPostByIdAndPassword()함수를 사용해 게시글 데이터 확인
    const post = await postService.getPostByIdAndPassword(collection, { id, password });
    // 데이터가 있으면 isExist true, 없으면 isExist false
    if (!post) {
        return res.status(404).json({ isExist: false });
    } else {
        return res.json({ isExist: true });
    }
});

app.delete("/delete", async (req, res) => {
    const { id, password } = req.body;
    try {
        // collection의 deleteOne을 사용해 게시글 하나를 삭제
        const result = await collection.deleteOne({ _id: ObjectId(id), password: password });
        // 삭제 결과과 잘못된 경우의 처리
        if (result.deletedCount !== 1) {
            console.log("삭제 실패");
            return res.json({ isSuccess: false });
        }
        return res.json({ isSuccess: true });
    } catch (error) {
        // 에러가 난 경우의 처리
        console.error(error);
        return res.json({ isSuccess: false });
    }
});

let collection;

app.listen(3000, async() => {
    console.log("Server started");
    // mongodbConnection()의 결과는 mongoClinet
    const mongoClient = await mongodbConnection();
    // mongoClient.db()로 db선택 collection("post")으로 collection선택후 collection에 할당
    collection = mongoClient.db().collection("post");
    console.log("MongoDB connected");
});