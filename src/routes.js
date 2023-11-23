import createUserHandler from "./controller/user.controller.js";
import {
    createUserSessionHandler,
    getUserSessionHandler,
    deleteSessionHandler
} from "./controller/session.controller.js"
import fs from "fs"

function routes(app){
    app.get("/healthcheck",(req,res)=>res.sendStatus(200));
    app.get("/postman_collection",(req,res)=>{
        const data = JSON.parse(fs.readFileSync("./postman_collection.json","utf8"))
        res.header("Content-Type","application/json");
        res.send(data);
    })
    // 사용자등록
    app.post("/api/users", createUserHandler)
    // 세션
    app.post("/api/sessions", createUserSessionHandler); //세션생성
    app.get("/api/sessions", getUserSessionHandler); //세션얻기
    app.delete("/api/sessions",deleteSessionHandler); //세션삭제)
}
export default routes;