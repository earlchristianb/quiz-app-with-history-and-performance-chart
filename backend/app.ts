import express,{Request,Response} from 'express'
import cors from 'cors';
import config from 'config'
import connect from './src/utils/connect';
import logger from './src/utils/logger';
import authRouter from './src/routes/auth.routes';
import userRouter from './src/routes/user.routes';
import quizRouter from './src/routes/quizResult.routes';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors());

const port = process.env.PORT || 9000

app.use(express.json({ limit: "30mb"}));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//routes
app.use('/auth',authRouter);
app.use('/user',userRouter)
app.use('/quiz', quizRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
});


app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
    await connect();
    
})
