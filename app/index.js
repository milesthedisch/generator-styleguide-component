var generators = require('yeoman-generator');
var fs = require('fs');

var StylguideComponent = module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Your component name',
            default : this.appname // Default to current folder name
        },
        function (answers) {
            makeComponent(this, answers.name);
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
                this.write(answers.name + '/' + answers.name + '.js', "");
                done();
             }
        }.bind(this));
    }

});

function makeComponent(yo, name) {
    yo.mkdir(name);
    yo.write(name + '/_' + name + '.scss' ,
        '// ' + name.charAt(0).toUpperCase() + name.slice(1) + '\n'+
        '//\n' +
        '// Markup: ' + name + '.html\n' +
        '//\n' +
        '// Styleguide components.' + name
    );
    yo.write(name + '/' + name + '.html', "");
}