import config from "config";
import pkg from 'lodash';
import SessionModel from "../models/session.model.js"
import { signJwt, verifyJwt } from "../utils/jwt.utils.js";
import { findUser } from "./user.service.js"

const { get } = pkg;

export async function createSession(userID,userAgent){
    const session = await SessionModel.create({user:userID,userAgent})
    return session.toJSON()
}

export async function findSessions(query){
    return SessionModel.find(query).lean();
}

export async function updateSession(query,update){
    return SessionModel.updateOne(query,update);
}

export async function reIssueAccessToken({refreshToken}){
    const {decoded} = verifyJwt(refreshToken);
    if (!decoded || !get(decoded,"session")) return false;
    const session = SessionModel.findById(get(decoded,"session"));
    if (!session || !session.valid) return false;
    const user = findUser({_id:session.user});
    if (!user) return false;
    //진짜 재발행 합시다.
    const accessToken = signJwt(
        {...user, session: session.id},
        {expiresIn: config.get("accessTokenTtl")} //15분
    ) 
    return accessToken;       
 }