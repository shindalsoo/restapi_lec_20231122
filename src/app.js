import express from "express"
import config from "config"
import logger from "./utils/logger.js"
import connect from "./utils/connect.js"
import routes from "./routes.js"
import deserializeUser from "./middleware/deserializeUser.js"

const port = config.get("port");
const app = express()

//middleware
app.use(express.json()); //req.body값을 갖어올수 있음
app.use(deserializeUser); //전처리

app.listen(port, async () =>{
    logger.info(`App is runnig at http://localhost:${port}`);
    await connect();
    routes(app);
})