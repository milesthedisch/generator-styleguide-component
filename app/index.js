var generators = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

var StylguideComponent = module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Your component name i.e. "layout narrow"',
            default : this.appname // Default to current folder name
        },
        function (answers) {

            this.mkdir(Component(answers.name).machineName);
            this.write(Component(answers.name).machineName + '/_' + Component(answers.name).machineName + '.scss' , makeScssFile(answers.name));
            this.write(Component(answers.name).machineName + '/' + Component(answers.name).machineName + '.html', "");

            done();

        }.bind(this));
    },
    prompting2: function() {
        var done = this.async();
        this.prompt({
            type    : 'confirm',
            name    : 'name',
            message : 'Do you have a jsFile?',
            default : false
        },
        function (answers) {
             if(answers.name == true) {
                this.write(Component(answers.name).machineName + '/' + Component(answers.name).machineName + '.js', "");
             }
            done();
        }.bind(this));
    }
});

function Component(name) {
    // clean string
    name = name.replace(/[|&;$%@"<>()+,]/g, "").trim();

    return {
        // First Letter of every word is capitalized
        title: name.replace(/\b./g, function(m){ return m.toUpperCase(); }),
        machineName: name.replace(/\s/g, "-")
    }
}

function makeScssFile(name) {
    return  '// ' + Component(name).title + '\n' +
            '//\n' +
            '// Markup: ' + Component(name).machineName + '.html\n' +
            '//\n' +
            '// Styleguide components.' + Component(name).machineName;
}