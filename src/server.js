import express from 'express'; //
import cors from 'cors';
import pino from 'pino-http'; //
import dotenv from 'dotenv';

dotenv.config();
export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
