English | [简体中文](./CONTRIBUTING-zh-Hans.md)

# How to Contribute

The following is a set of guidelines for contributing to Griffith. Please spend several minutes in reading these guidelines before you create an issue or pull request.

## [Code of Conduct](./CODE_OF_CONDUCT.md)

We have adopted a Code of Conduct that we expect project participants to adhere to. Please read the [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Open Development

All work on Griffith happens directly on GitHub. Both core team members and external contributors send pull requests which go through the same review process.

### Workflow and Pull Requests

_Before_ submitting a pull request, please make sure the following is done…

1.  Fork the repo and create your branch from `master`. A guide on how to fork a repository: https://help.github.com/articles/fork-a-repo/

    Open terminal (e.g. Terminal, iTerm, Git Bash or Git Shell) and type:

    ```sh
    $ git clone https://github.com/<your_username>/griffith
    $ cd griffith
    $ git checkout -b my_branch
    ```

    Note: Replace `<your_username>` with your GitHub username

2.  Griffith uses [Yarn](https://yarnpkg.com/en/) for running development scripts. If you haven't already done so, please [install yarn](https://yarnpkg.com/en/docs/install).

3)  Run `yarn install`. On Windows: To install [Yarn](https://yarnpkg.com/en/docs/install#windows-tab) on Windows you may need to download either node.js or Chocolatey<br />.

    ```sh
    yarn
    ```

    To check your version of Yarn and ensure it's installed you can type:

    ```sh
    yarn --version
    ```

4)  We have provided several examples for development. You can run the following script and develop according to the webpack prompt.

    ```sh
    yarn start
    ```

5)  If you've changed APIs, update the documentation.

6)  Ensure the linting is good via `yarn run lint:fix`.

    ```sh
    npm run format
    npm run lint
    ```

7)  Ensure the testing is good via `yarn run test`.

    ```sh
    yarn test
    ```

8)  Ensure the commit is readable. see [Conventional Commits](https://www.conventionalcommits.org/zh/v1.0.0-beta.2/).

## Bugs

### Where to Find Known Issues

We will be using GitHub Issues for our public bugs. We will keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new issue, try to make sure your problem doesn't already exist.

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. Please provide a public repository with a runnable example.

## License

By contributing to Griffith, you agree that your contributions will be licensed under its MIT license.
