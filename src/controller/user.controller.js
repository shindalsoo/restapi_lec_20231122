import createUser from "../service/user.service.js"
import logger from "../utils/logger.js"

export default async function createUserHandler(req,res){
    try{
        const user = await createUser(req.body);
        return res.status(200).send("사용자1명 등록성공");
    }catch(e){
        logger.error(e);
        return res.status(409).send(e.message);
    }
}
