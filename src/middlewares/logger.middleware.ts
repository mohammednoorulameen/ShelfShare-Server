import morgan from "morgan";
import { logger } from "../shared/utils/logger";




const stream = {
  write: (message: string) => logger.info(message.trim()),
};

export const httpLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);
