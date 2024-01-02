const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");
// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import Person from "./person-model";

mongoose.set("strictQuery", false);

const app = express();
// http에서 body를 파싱하기 위한 설정
app.use(bodyParser.json());
app.listen(3000, async() => {
    console.log("Server started");
    const mongodbUri = "mongodb+srv://qwe5344641:1q2w3e4r5t@cluster0.3vwuqmt.mongodb.net/"
    // mongoDB 커넥션
    mongoose
        .connect(mongodbUri, {useNewUrlParser: true})
        .then(console.log("Connected to MongoDB"));
});

// 모든 person data 출력
app.get("/person", async (req, res) => {
    const person = await Person.find({});
    res.send(person);
});

// 특정 email로 person찾기
app.get("/person/:email", async (req, res) => {
    const person = await Person.findOne({email: req.params.email});
    res.send(person);
})

// person data 추가
app.post("/person", async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
    // const result = await Person.create(req.body);
    // res.send(result);
});

// person data 수정
app.put("/person/:email", async (req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );
    // Person.updateOne({ email: req.params.email },
    //     { $set: req.body })
    console.log(person);
    res.send(person);
});

// person data 삭제
app.delete("/person/:email", async (req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ success: true });
});