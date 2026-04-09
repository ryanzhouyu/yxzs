# manager-api

后端服务默认运行在 `http://localhost:4000`。

## 本地开发

1. 复制环境变量文件：`copy .env.example .env`
2. 启动数据库：`npm run db:start`
3. 初始化数据库：`npm run db:init`
4. 启动服务：`npm run dev`

## Docker 开发

根目录已提供完整的 `docker-compose.yml`。如果需要连同后端一起容器化运行，请回到仓库根目录执行：

```powershell
npm run docker:dev
```

## 环境变量

`.env.example` 默认和根目录 `docker-compose.yml` 的 MySQL 配置匹配：

```env
PORT=4000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=creative_user
DB_PASSWORD=creative_pass
DB_NAME=hotel_creative
JWT_SECRET=change-this-to-a-random-string
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

如果后端运行在 Docker 中，`docker-compose.yml` 会覆盖 `DB_HOST=mysql`，不需要手工改 `.env`。

## 数据库命令

- `npm run db:start`
- `npm run db:stop`
- `npm run db:logs`
- `npm run db:wait`
- `npm run db:migrate`
- `npm run db:seed`
- `npm run db:init`
- `npm run db:bootstrap`
