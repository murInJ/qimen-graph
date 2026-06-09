# GitHub Pages 部署说明

本项目是纯静态站点，不需要构建。

## 推荐部署方式：GitHub Actions

1. 将本目录内容推送到仓库 `main` 分支根目录。
2. 打开仓库 `Settings → Pages`。
3. Source 选择 `GitHub Actions`。
4. 打开仓库 `Actions`，确认 `Deploy static site to GitHub Pages` 工作流运行成功。
5. 访问：

```text
https://<username>.github.io/qimen-graph/
```

## 注意事项

- 不要把外层压缩包目录再套一层推到仓库根目录；仓库根目录应该直接看到：
  - `index.html`
  - `styles.css`
  - `.nojekyll`
  - `.github/workflows/pages.yml`
  - `js/`
- 如果使用 GitHub Actions，`Settings → Pages → Source` 必须选择 `GitHub Actions`。
- 如果使用 branch 部署，则不需要 workflow，但也可以保留。
