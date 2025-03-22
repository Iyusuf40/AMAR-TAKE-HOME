import { Request, Response } from "express";
import qoutesGenerator, { isValidSymbol } from "./service";
import { HTTP_STATUS } from "../constants";

export const getQuote = (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;

    if (!symbol) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: true,
        message: "Symbol parameter is required.",
      });
      return
    }

    if (!isValidSymbol(symbol)) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        error: true,
        message: `Symbol '${symbol}' is not supported.`,
      });
      return
    }

    const price = qoutesGenerator.getPiceForSymbol(symbol);

    res.status(HTTP_STATUS.OK).json({ symbol, price });
  } catch (error) {
    console.error("Error fetching quote:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: "An unexpected error occurred.",
    });
  }
};
