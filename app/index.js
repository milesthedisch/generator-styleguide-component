var componentName;
var generators = require('yeoman-generator');
var fs = require('fs');

var StylguideComponent = module.exports = generators.Base.extend({

    prompting: function () {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Your component name i.e. "layout narrow"',
            default : this.appname // Default to current folder name
        }, function (answers) {
            this.log(componentName = answers.name);
            done();
        }.bind(this));
    },

    createComponent: function () {
        var componentNameMachine = componentName.replace(/\s/g, "-");
        var componentNameHuman = componentName;
        
        this.mkdir(componentNameMachine);
        this.write(componentNameMachine + '/_' + componentNameMachine + '.scss' ,
            '// ' + componentNameHuman.charAt(0).toUpperCase() + componentNameHuman.slice(1) + '\n'+
            '//\n' +
            '// Markup: ' + componentNameMachine + '.html\n' +
            '//\n' +
            '// Styleguide components.' + componentNameMachine
        );
        this.write(componentNameMachine + '/' + componentNameMachine + '.html', "");
    }

});
