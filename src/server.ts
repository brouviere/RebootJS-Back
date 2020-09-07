import express, { Request, Response, ErrorRequestHandler } from 'express';
import morgan from "morgan";
import helmet from "helmet";
import { configuration, IConfig } from "./config";
import { connect } from './database';
import bodyParser from 'body-parser';

import profileRoutes from './routes/profileRoutes';
import loginRoute from './routes/loginRoute';
import { authenticationInitialize } from './controllers/authenticationController';

export function createExpressApp(config: IConfig): express.Express {
  
  const { express_debug } = config;

  const app = express();

  app.use(morgan('combined'));
  app.use(helmet());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(authenticationInitialize());

  app.use(((err, _req, res, _next) => {
    console.error(err.stack);
    res.status?.(500).send(!express_debug ? 'Oups' : err);
  }) as ErrorRequestHandler);

  app.get('/', (req: Request, res: Response) => { res.send('This is the boilerplate for Flint Messenger app') });
  
  app.use('/profiles', profileRoutes);

  app.use('/login', loginRoute)

  return app;
}

const config = configuration();
const { PORT } = config;
const app = createExpressApp(config);
connect(config).then( () => {
  app.listen(PORT, () => console.log(`Flint messenger listening at ${PORT}`));
})

