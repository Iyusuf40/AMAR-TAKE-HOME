import { Router } from "express";
import { getQuote } from "./controller";

const quotesRoute = Router();
quotesRoute.get("/quote/:symbol", getQuote);

export default quotesRoute;
