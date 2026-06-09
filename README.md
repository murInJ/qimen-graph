# qimen-graph

奇门遁甲节点图排盘静态项目。结构参考 `liuyao-graph` / `liuren-graph`：把排盘拆成数据、历法、核心排盘、关系建模、导出、渲染、应用入口几层。

## 目录

```text
index.html
styles.css
.nojekyll
README.md
DESIGN.md
js/data.js
js/utils.js
js/calendar.js
js/qimen-core.js
js/relations.js
js/export.js
js/render.js
js/app.js
```

## 本地运行

可直接双击 `index.html`。推荐用静态服务器：

```bash
python3 -m http.server 8080
```

再访问 `http://localhost:8080`。

## 当前功能

- 时家奇门 / 转盘法原型
- 占测时间输入和“刷新为当前时间”
- 近似四柱、节气、阴阳遁、三元、局数、旬首、空亡
- 九宫卡片：神、星、门、天盘干、地盘干、标签
- 六维状态：宫势、门用、星势、神助、格局、落地
- 点击宫位查看关系边、修正项、局部关系图
- 一键复制完整盘面给大模型
- 一键复制 JSON / 下载 JSON

## 边界

当前版本是静态前端原型，历法与排盘为可解释近似实现。奇门遁甲流派众多，后续可替换 `calendar.js` 和 `qimen-core.js` 接入严格历法与成熟排盘算法。
