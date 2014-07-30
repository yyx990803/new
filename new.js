#!/usr/bin/env node

var Metalsmith = require('metalsmith'),
    async      = require('async'),
    prompt     = require('cli-prompt'),
    render     = require('consolidate').handlebars.render,
    path       = require('path')

var cwd = process.cwd()

var templatesPath = path.relative(cwd, path.join(
    process.env.NEW_TEMPLATE_PATH || path.join(process.env.HOME, '_templates'),
    process.argv[2] || 'default'
))

var builder = new Metalsmith(cwd)
    .source(templatesPath)
    .use(ask)
    .use(template)
    .build(function (err) {
        if (err) throw err
    })

function ask (files, builder, done) {
    var prompts = {
        'project name': function (val) {
            val = val || 'new-project'
            builder.metadata().name = val
            builder.destination(val)
        }
    }

    async.eachSeries(Object.keys(prompts), run, done)

    function run(key, done){
        prompt('  ' + key + ': ', function (val) {
            prompts[key](val)
            done()
        })
    }
}

function template (files, builder, done) {
    var keys = Object.keys(files),
        meta = builder.metadata()

    async.each(keys, run, done)

    function run (file, done) {
        var str = files[file].contents.toString()
        render(str, meta, function (err, res) {
            if (err) return done(err)
            files[file].contents = new Buffer(res)
            console.log('  render: ' + meta.name + '/' + file)
            done()
        })
    }
}