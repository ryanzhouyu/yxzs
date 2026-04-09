# manager-main

前端开发服务器默认运行在 `http://localhost:3000`。

## 本地开发

```powershell
npm install
npm run dev
```

前端通过 `VITE_API_URL` 请求后端，默认使用 `/api`。Vite 开发代理通过 `VITE_PROXY_TARGET` 指向后端服务。

```env
VITE_API_URL=/api
VITE_PROXY_TARGET=http://localhost:4000
```

## Docker 开发

如果你希望前端也在容器里运行，请在仓库根目录执行：

```powershell
npm run docker:dev
```

在 Docker 模式下，开发代理会自动切到 `http://api:4000`，不需要手工改配置。

## 协作建议

- 不提交 `dist`、本地 `.env` 和临时日志
- 接口地址变化时，优先改 `.env.example`
- 新机器启动流程以仓库根目录 [README](/h:/AI project/yxzs/README.md) 为准
