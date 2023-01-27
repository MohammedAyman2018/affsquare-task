import { AppDataSource } from "./data-source";
import * as express from "express";
import articleRoutes from "./Article/routes";

AppDataSource.initialize()
  .then(async () => {
    const app: express.Express = express();
    const port = process.env.PORT || 3000;
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/articles", articleRoutes);
    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
  })
  .catch((error) => console.log(error));
