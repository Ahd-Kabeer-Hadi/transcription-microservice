import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { rateLimiterMiddleware } from "./middleware/rateLimiter";
import { promClient } from "./utils/metrics";
import transcriptionRoutes from "./routes/transcriptionRoutes";
import healthCheckRoutes from "./routes/healthCheck";
import logger from "./utils/logger";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(rateLimiterMiddleware);

app.use("/api/transcriptions", transcriptionRoutes);
app.use("/health", healthCheckRoutes);

app.use(errorHandler);

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
  logger.info(
    `API documentation available at http://localhost:${port}/api-docs`
  );
});

export default app;
