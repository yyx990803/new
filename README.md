# New

> Scaffold a new project

Like Yeoman, but only with minimal functionality for my personal use. Not published on npm. The only thing it does is loading a folder of scaffold templates and running them through handlebars.

## Usage

Clone this repo then `npm link`.

``` bash
new [template_name]
```

If no `template_name` is provided, it will use `"default"`. Default template root path is `~/_templates`, so the default template will be loaded from `~/_templates/default`.

To configure the template root path, make an env variable `NEW_TEMPLATE_PATH`.