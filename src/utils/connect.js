import mongoose from 'mongoose';
import config from "config";
import logger from "./logger.js"

async function connect(){
    const dbUri = config.get("dbUri");
    try {
        mongoose.connect(dbUri);
        logger.info("아싸뵤, DB에 연결했음");
    }catch(error){
        logger.info("헉, DB에 연결할수 없이유...")
        process.exit(1);
    }
    
}

export default connect;