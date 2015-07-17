var componentName;
var generators = require('yeoman-generator');
var fs = require('fs')

var StylguideComponent = module.exports = generators.Base.extend({

    prompting: function () {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Your component name',
            default : this.appname // Default to current folder name
        }, function (answers) {
            this.log(componentName = answers.name);
            done();
        }.bind(this));
    },

    createComponent: function () {
        this.mkdir(componentName);
        this.write(componentName + '/_' + componentName + '.scss' ,
            '// ' + componentName.charAt(0).toUpperCase() + componentName.slice(1) + '\n'+
            '//\n' +
            '// Markup: ' + componentName + '.html\n' +
            '//\n' +
            '// Styleguide components.' + componentName
        );
        this.write(componentName + '/' + componentName + '.html', "");
    }

});
