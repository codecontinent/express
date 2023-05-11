#Contributing

We are open to, and grateful for, any contributions made by the community. By contributing to our express.js boilerplate, you agree to abide by the [code of conduct](https://github.com/codecontinent/express/blob/master/CODE_OF_CONDUCT.md).

## Reporting Issues and Asking Questions

Before opening an issue, please search the [issue tracker](https://github.com/codecontinent/express/issues) to make sure your issue hasn't already been reported.

### Bugs and Improvements

We use the issue tracker to keep track of bugs and improvements to our express.js boilerplate itself, its examples, and the documentation. We encourage you to open issues to discuss improvements, architecture, theory, internal implementation, etc. If a topic has been discussed before, we will ask you to join the previous discussion.

As our express.js boilerplate is stable, changes to its behavior are very carefully considered. Any pull requests that involve breaking changes should be made against the `next` branch.

### Getting Help
Please be considerate when doing this as this is not the primary purpose of the issue tracker. But you can actually discuss on our `Discussion`.

### Help Us Help You

On both websites, it is a good idea to structure your code and question in a way that is easy to read to entice people to answer it. For example, we encourage you to use syntax highlighting, indentation, and split text in paragraphs.

Please keep in mind that people spend their free time trying to help you. You can make it easier for them if you provide versions of the relevant libraries and a runnable small project reproducing your issue. You can put your code on [JSBin](https://jsbin.com) or, for bigger projects, on GitHub. Make sure all the necessary dependencies are declared in `package.json` so anyone can run `npm install && npm start` and reproduce your issue.

## Development

Visit the [issue tracker](https://github.com/codecontinent/express/issues) to find a list of open issues that need attention.

Fork, then clone the repo:

```sh
git clone https://github.com/codecontinent/express.git
```

### Environment Guides

This repo uses Yarn for all package management. Please ensure that Yarn 1.22.x is installed globally on your system, so that Yarn will run properly inside this repo.
Also, we have used node-version `>=16.x`. We recommened node-version (LTS) 16 or 18.

#### Building For Production

Running the `build` task will create a CommonJS module-per-module build, a ES Modules build.

```sh
yarn build
```
This will create a new directory called `dist`. Where your `production` ready application code will be available.
Although, you can just run this application directly in `production` mode by using `cross-env NODE_ENV=production yarn babel-node src/server`

### Testing and Linting

To only run linting:

```sh
yarn lint
```

To continuously watch and run tests, run the following:

```sh
yarn test:w
```

To only run tests:

```sh
yarn test
```

### Docs

Improvements to the documentation are always welcome. We have integrated `swagger-autogen` for automatically generate API documentation. You can find the documentation at `/api/docs`.
Can customize or update through the development using `src/swagger.js`, and executing `yarn gen` or `yarn gen:w` to continuously watch.


### Sending a Pull Request

For non-trivial changes, please open an issue with a proposal for a new feature or refactoring before starting on the work. We don't want you to waste your efforts on a pull request that we won't want to accept.

On the other hand, sometimes the best way to start a conversation _is_ to send a pull request. Use your best judgement!

In general, the contribution workflow looks like this:

- Open a new issue in the [Issue tracker](https://github.com/codecontinent/express/issues).
- Fork the repo.
- Create a new feature branch based off the `dev` branch.
- Make sure all tests pass and there are no linting errors.
- Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!
