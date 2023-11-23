import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get("privateKey");
const publicKey = config.get("publicKey");

export function signJwt(object,options){ //토큰을 생성할때
    return jwt.sign(object, privateKey,{
        ...(options && options),
        algorithm: "RS256"       
    });
}

export function verifyJwt(token){ //발행된 토큰을 검증할때
    try{
        const decoded = jwt.verify(token, publicKey);
        return{
            valid: true,
            expired: false,
            decoded,
        };
    } catch(e){
        console.error(e);
        return{
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        }
    }
}