import config from "config";
import {
    createSession,
    findSessions,
    updateSession
} from "../service/session.service.js"
import { validatePassword } from "../service/user.service.js"
import { signJwt } from "../utils/jwt.utils.js"

export async function createUserSessionHandler(req,res){
    // 1. 아디이 존재여부 및 비밀번호체크
    const user = await validatePassword(req.body);
    if (!user) return res.status(401).send("Invalid email or password")

    // 2. 세션 DB에 Insert
    const session = await createSession(user._id, req.get("user-agent") || "");

    // 3. Access Token 생성
    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")} //15분
    );

    // 4. Refresh Token 생성
    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("refreshTokenTtl")} //15분
    );
    // 반환 (accessToken & refreshToken)
    return res.send({accessToken, refreshToken});
}

export async function getUserSessionHandler(req,res){
    const userId = res.locals.user._id; //전처리때 구해온값
    const sessions = await findSessions({user:userId, valid:true});
    return res.send(sessions);
}
export async function deleteSessionHandler(req,res) {
    const sessionId = res.locals.user._id; //전처리때 구해온값
    await updateSession({_id: sessionId}, {valid:false});
    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}