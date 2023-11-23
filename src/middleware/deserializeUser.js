import pkg from 'lodash';
import { verifyJwt } from "../utils/jwt.utils.js"
import {reIssueAccessToken} from "../service/session.service.js"

const {get} = pkg;

const deserializeUser = async(req,res,next) => {
    const accessToken = get(req,"header.authorization","").replace(/^Bearer\s/,"");
    const refreshToken = get(req, "header.x-refresh");
    if (!accessToken) {return next();}
    const {decoded,expired} = verifyJwt(accessToken);
    if (decoded){
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken){
        const newAccessToken = await reIssueAccessToken({refreshToken});
        if (newAccessToken){
            res.setHeader("x-access-token", newAccessToken);
        }
        const result = verifyJwt(newAccessToken);
        res.locals.user = result.decoded;
        return next();
    }
    return next();
}

export default deserializeUser;