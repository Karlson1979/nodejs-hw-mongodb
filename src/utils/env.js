export const getEnvVar = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};
PORT;
MONGODB_USER;
MONGODB_PASSWORD;
MONGODB_URL;
MONGODB_DB;
