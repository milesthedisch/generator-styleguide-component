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
};

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
    },
    generateComponent: function() {
        var done = this.async();
        var answers = component.answers;
        this.prompt({
            type    : 'confirm',
            name    : 'generate',
            message : 'Do you wish to generate component: ' + answers.name + '?',
            default : false
        },
        function (reply) {
            var machineName = component.machineName(answers.name);
            var name = component.title(answers.name);

            this.template('styles.tpl.scss', machineName + '/_' + machineName + '.scss', {
                name: name,
                machineName: machineName
            });
            this.template('index.tpl.html', machineName + '/' + machineName + '.html', {
                name: name,
                machineName: machineName
            });
            done();
        }.bind(this));
    }
});