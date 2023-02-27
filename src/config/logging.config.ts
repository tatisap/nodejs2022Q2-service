export const loggingConfig = () => ({
  LOG_LEVELS: ['error', 'warn', 'log', 'verbose', 'debug'].slice(
    0,
    Number(process.env.LOG_LEVEL) + 1,
  ),
  LOG_FILE_MAX_SIZE: Number(process.env.MAX_LOG_FILE_SIZE) * 1024,
  LOG_FOLDER_PATH: process.cwd() + '/logs',
});
