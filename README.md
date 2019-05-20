# eslint-disable-table
> List all eslint disable rules in use

## Install

```shell
$  npm i -g eslint-disable-table
```

## Usage

```shell
$ eslint-disable-table -h
    Usage: eslint-disable-table [options]

    Options:
      -d, --directory <dir>    directory to inspect (default: $PWD)
      -j, --json               output json
      -e, --exclude <exclude>  exclude patterns, comma separated list
      -h, --help               output usage information

    Examples:

      $ eslint-disable-table -j > table.json
      $ eslint-disable-table -e .nycoutput, coverage
      $ eslint-disable-table -d ~/all-my-projects
```

## Example Output

### Table

```shell
$ eslint-disable-table
```

```shell
┌─────────────────────────┬──────┬────────────────────────┐
│ File                    │ Line │ Rules                  │
├─────────────────────────┼──────┼────────────────────────┤
│ /test/fixtures/01/01.js │ 3    │ no-console, include-me │
├─────────────────────────┼──────┼────────────────────────┤
│ /test/fixtures/02/02.js │ 3    │ no-console             │
└─────────────────────────┴──────┴────────────────────────┘
```

### Json

```shell
$ eslint-disable-table -j
```

```json
[
    {
        "line": 3,
        "value": "eslint-disable-line no-console, include-me",
        "file": "/home/jdelibas/Documents/repos/personal/eslint-disable-table/test/fixtures/01/01.js",
        "rules": [
            "no-console",
            "include-me"
        ]
    },
    {
        "line": 3,
        "value": "eslint-disable-line no-console",
        "file": "/home/jdelibas/Documents/repos/personal/eslint-disable-table/test/fixtures/02/02.js",
        "rules": [
            "no-console"
        ]
    }
]
```

## LICENSE

[DBAD](./LICENSE.md) for more [info](https://dbad-license.org/)