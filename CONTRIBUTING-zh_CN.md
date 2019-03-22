[English](./CONTRIBUTING.md) | 简体中文

# 贡献指南

这篇指南会指导你如何为 Griffith 贡献一份自己的力量，请在你要提 issue 或者 pull request 之前花几分钟来阅读一遍这篇指南。

## [行为准则](./CODE_OF_CONDUCT.md)

我们有一份[行为准则](./CODE_OF_CONDUCT.md)，希望所有的贡献者都能遵守，请花时间阅读一遍全文以确保你能明白哪些是可以做的，哪些是不可以做的。

## 透明的开发

我们所有的工作都会放在 GitHub 上。不管是核心团队的成员还是外部贡献者的 pull request 都需要经过同样流程的 review。

### 工作流和 Pull Request

在提交 PR 前，请确保你做了以下的事情。

1.  Fork Griffith 仓库，并在新仓库创建新的分支。这里有一份如何 fork 的指南：https://help.github.com/articles/fork-a-repo/。

    打开命令行:

    ```sh
    $ git clone https://github.com/<your_username>/griffith
    $ cd griffith
    $ git checkout -b my_branch
    ```

    Note: 把 `<your_username>` 替换成你的 GitHub 用户名。

2.  Griffith 使用 [Yarn](https://yarnpkg.com/zh-Hant/) 来管理项目依赖. 请确保你的开发环境已经安装了 Yarn。

3.  使用 Yarn 安装依赖：

    ```sh
    yarn
    ```

    检查 yarn 版本

    ```sh
    yarn --version
    ```

4.  我们提供了多个例子供开发使用，你可以直接运行以下脚本，根据 webpack 提示进行开发。

    ```sh
    yarn start
    ```

5.  如果你修改了 APIs，请更新文档。

6.  确保能通过 lint 校验。

    ```sh
    npm run lint:fix
    ```

7.  请确保能通过所有测试用例。

    ```sh
    yarn test
    ```

8.  请确保 commit 符合规范。Griffith 使用[约定式提交](https://www.conventionalcommits.org/zh/v1.0.0-beta.2/) 来规范 commit。

## 提交 bug

### 查找已知的 Issues

我们使用 GitHub Issues 来管理项目 bug。 我们将密切关注已知 bug，并尽快修复。 在提交新问题之前，请尝试确保您的问题尚不存在。

### 提交新的 Issues

请按照 Issues Template 的指示来提交新的 Issues。
