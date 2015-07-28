var generators = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var component = {
    name: function(name) {
        return name.replace(/[|&;$%@"<>()+,]/g, "").trim();
    },
    title: function(name) {
        return this.name(name).replace(/\b./g, function(m){ return m.toUpperCase(); });
    },
    machineName: function(name) {
        return this.name(name).replace(/\s/g, "-");
    },
    answers: {}
}

var Stylguidecomponent = module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Your component name i.e. "layout narrow"',
            default : this.appname // Default to current folder name
        },
        function (answers) {

            component.answers = answers;

            var machineName = component.machineName(answers.name);

            this.mkdir(machineName);
            this.write(machineName + '/_' + machineName + '.scss' , makeScssFile(answers.name));
            this.write(machineName + '/' + machineName + '.html', "");

            done();

        }.bind(this));
    },
    prompting2: function() {
        var done = this.async();
        this.prompt({
            type    : 'confirm',
            name    : 'js',
            message : 'Do you have a jsFile?',
            default : false
        },
        function (answers) {
            var machineName = component.machineName(component.answers.name);
             if(answers.js) {
                 this.write(machineName + '/_' + machineName + '.js', "");
             }
            done();
        }.bind(this));
    },
    prompting3: function() {
        var done = this.async();
        this.prompt({
                type    : 'confirm',
                name    : 'json',
                message : 'Do you have a json file?',
                default : false
            },
            function (answers) {
                var machineName = component.machineName(component.answers.name);
                if(answers.json) {
                    this.write(machineName + '/_' + machineName + '.json', "");
                }
                done();
            }.bind(this));
    }
});

function makeScssFile(name) {
    return  '// ' + component.title(name) + '\n' +
            '//\n' +
            '// Markup: ' + component.machineName(name) + '.html\n' +
            '//\n' +
            '// Styleguide components.' + component.machineName(name);
}