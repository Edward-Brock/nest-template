<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Nest Template

[Nest](https://nestjs.com/) 是一个用于构建高效，可扩展的 [Node.js](http://nodejs.org) 服务器端应用程序的渐进式框架。

Nest Template 是在 Nest 框架基础上添加相关依赖及功能，扩展 Nest 框架的开箱即用体验。

## 描述

项目采用基于 [TypeScript](https://www.typescriptlang.org/) 语言入门的 [Nest](https://github.com/nestjs/nest)
框架存储库，使用 [pnpm](https://pnpm.io/) 作为包管理工具。

## 支持功能

- Nest Config
- 跨源资源共享功能（CORS）
- 全局日志记录（使用 Winston）
- 数据库（使用 TypeORM）
- 全局中间件、全局异常过滤器、全局响应拦截器
- 速率限制（Rate limiting）
- Swagger
- 健康检查
- 身份验证

## 安装

```bash
$ pnpm install
```

## 运行

项目使用环境变量对相关配置进行管理，运行项目之前，你需要在 `env` 文件夹中分别新建 `.env`、`.env.development`
及 `.env.production` 文件，环境变量内的相关配置可以参考 `.env.example` 内的文件内容。

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 测试

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 支持

Nest 是一个 MIT
许可的开源项目。它的发展得益于赞助商和支持者的支持。如果你想加入他们，请[在此处阅读更多信息](https://docs.nestjs.com/support)。

## 与我联系

- 作者 - [Edward-Brock](https://github.com/Edward-Brock)
- 网站 - [https://booop.net](https://booop.net/)

## 许可证

Nest 采用 [MIT 许可证](LICENSE)。
