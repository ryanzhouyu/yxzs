# Creative Hub Workspace

本仓库包含两个子项目：

- `manager-api`：Node.js / Express 后端
- `manager-main`：React / Vite 前端

推荐把 Docker 作为统一开发环境的一部分使用。这样在公司和家里切换电脑时，代码由 Git 同步，数据库和运行方式由 Docker 与仓库脚本保持一致。

## 开发方式

### 方式一：本地运行前后端，Docker 只负责 MySQL

首次准备：

```powershell
npm run setup
```

日常开发：

```powershell
npm run dev
```

### 方式二：前后端和 MySQL 全部使用 Docker

首次准备环境变量：

```powershell
npm run env:sync
```

启动完整开发环境：

```powershell
npm run docker:dev
```

停止容器：

```powershell
npm run docker:down
```

查看容器日志：

```powershell
npm run docker:logs
```

## 首次在新电脑启动

1. 安装 Node.js 20+
2. 安装 Docker Desktop
3. 拉取仓库并进入根目录
4. 执行 `npm run setup`
5. 开发时使用 `npm run dev` 或 `npm run docker:dev`

如果你使用完整 Docker 开发模式，第一次启动数据库后还需要初始化一次：

```powershell
npm run db:init
```

## 常用命令

- `npm run setup`：复制 `.env`、安装依赖、启动 MySQL、执行迁移和种子
- `npm run env:sync`：仅补齐缺失的 `.env`
- `npm run dev`：本地启动前后端，数据库走 Docker
- `npm run stop`：停止本地前后端并关闭 Docker 服务
- `npm run db:start`：启动 MySQL 容器
- `npm run db:stop`：关闭 Docker 服务
- `npm run db:init`：执行数据库等待、迁移和种子
- `npm run db:reset`：清空并重建数据库
- `npm run healthcheck`：检查前后端健康状态
- `npm run smoke:test`：执行基础接口冒烟测试
- `npm run docker:dev`：用 Docker 启动 MySQL、API、Web
- `npm run docker:down`：停止完整 Docker 开发环境
- `npm run docker:logs`：查看 MySQL、API、Web 日志

## 访问地址

- 前端：`http://localhost:3000`
- 后端：`http://localhost:4000`
- 健康检查：`http://localhost:4000/api/health`

默认测试账号：

- 用户名：`demo`
- 密码：`demo123`

## 协作约定

- 不提交 `node_modules`、日志、构建产物和本地 `.env`
- 提交 `Dockerfile`、`docker-compose.yml`、`.env.example` 和 README
- 数据库结构变更走 `manager-api/migrations`
- 初始化数据走 `manager-api/seeds`

## 目录说明

- [docker-compose.yml](/h:/AI project/yxzs/docker-compose.yml)
- [manager-api/README.md](/h:/AI project/yxzs/manager-api/README.md)
- [manager-main/README.md](/h:/AI project/yxzs/manager-main/README.md)
