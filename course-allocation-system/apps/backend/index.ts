import { createApp } from "./src/app";
import { env } from "./src/config/env";

const app = createApp();

app.listen(Number(env.PORT), () => {
  console.log(`🚀 Backend running on http://localhost:${env.PORT}`);
  console.log(`📋 Environment: ${env.NODE_ENV}`);
  console.log(`🔒 CORS origin: ${env.CORS_ORIGIN}`);
});