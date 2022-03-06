import express,{Request,Response} from 'express'
import cors from 'cors';
import config from 'config'
import connect from './utils/connect';
import logger from './utils/logger';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import quizRouter from './routes/quizResult.routes';
const app = express();

app.use(cors());

const PORT = config.get<number>('PORT');

app.use(express.json({ limit: "30mb"}));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//routes
app.use('/auth',authRouter);
app.use('/user',userRouter)
app.use('/quiz',quizRouter)


app.listen(PORT, async () => {
    logger.info(`App is running at http://localhost:${PORT}`);
    await connect();
    
})
