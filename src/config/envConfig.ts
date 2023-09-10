import * as fs from 'fs';
import * as path from 'path';

function parseEnv() {
  const envFilePath = 'env/';
  // 引入兜底环境变量文件
  const localEnv = path.resolve(envFilePath + '.env');
  // 引入生产环境变量文件
  const prodEnv = path.resolve(envFilePath + '.env.production');
  // 引入开发环境变量文件
  const devEnv = path.resolve(envFilePath + '.env.development');

  if (
    !fs.existsSync(localEnv) &&
    !fs.existsSync(prodEnv) &&
    !fs.existsSync(devEnv)
  ) {
    throw new Error('缺少环境变量配置文件');
  }

  // 判断当前环境是否存在开发环境 .env 文件，若存在则为开发环境，若不存在则为生产环境并返回对应的 filePath
  const filePath = fs.existsSync(devEnv) ? devEnv : prodEnv;
  console.log(
    `※ CURRENTLY IN [ ${
      fs.existsSync(devEnv) ? 'DEVELOPMENT' : 'PRODUCTION'
    } ] ENVIRONMENT!`,
  );
  return { path: filePath };
}

export default parseEnv();
