import dotenv from "dotenv";
dotenv.config({ path: ".env" });
function config(Env: any) {
    return {
      PORT: Env?.PORT,
      databaseUrl: Env?.DB_URL,
      secretKey: Env?.SECRET_KEY,
    };
}

const env = process.env?.ENVIRONMENT as string;
export default {
  ...config(process.env),
};
