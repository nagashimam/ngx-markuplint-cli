# ngx-html-bridge-cli

## What is this library?

This is CLI tool for executing `runMarkuplintAgainstTemplateFile` of [ngx-html-bridge-markuplint](https://github.com/nagashimam/ngx-html-bridge-markuplint).

## What is this library for?

Main intended usecase is juse the same as CLI of original [Markuplint](https://markuplint.dev/), but specifically for Angular apps.

## API

npx ngx-markuplint file

positional arguments:
file: File(s) to run Markuplint against. Accepts glob pattern

## example

```bash
npx ngx-markuplint src/app/sample/sample.html
npx ngx-markuplint src/**/*.html
```
