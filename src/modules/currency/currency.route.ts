import { Router } from "express";
import CurrencyController from "./currency.controller";
const currencyRouter = Router();
currencyRouter.post("/create", CurrencyController.create);
currencyRouter.get("/get-currency", CurrencyController.getUsdVal);
export default currencyRouter;