var generators = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var component = {
    trimString: function(name) {
        return name.replace(/[|&;$%@"<>()+,]/g, "").trim();
    },
    capitalizeString: function(name) {
        return this.trimString(name).replace(/\b./g, function(m){ return m.toUpperCase(); });
    },
    addDash: function(name) {
        return this.trimString(name).replace(/\s/g, "-");
    },
    splitString: function(name) {
        //leaves commas but strips all other special characters
        return name.replace(/[^A-Z0-9-,]/ig, "").split(',');
    },
    answers: {
        subComponentNames: '',
        modifierNames: ''
    }
};

var StylguideComponent = module.exports = generators.Base.extend({

    getNamePrompt: function() {
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
    getSubComponentsPrompt: function() {
        var done = this.async();
        this.prompt([{
            type    : 'confirm',
            name    : 'subComponents',
            message : 'Do you have any sub-component(s)?',
            default : false
        },
        {
            when: function(response) {
                return response.subComponents;
            },
            type    : 'input',
            name    : 'subComponentNames',
            message : 'Input the sub-components',
            default : ''
        }],
        function(answers) {
            component.answers.subComponentNames = component.splitString(answers.subComponentNames);
            done();
        });
    },
    getModifiersPrompt: function() {
        var done = this.async();
        this.prompt([{
            type    : 'confirm',
            name    : 'modifiers',
            message : 'Do you have a modifier(s)?',
            default : false
        },
        {
            when: function(response) {
                return response.modifiers;
            },
            type    : 'input',
            name    : 'modifierNames',
            message : 'Input the modifiers',
            default : ''
        }],
        function(answers) {
            component.answers.modifierNames = component.splitString(answers.modifierNames);
            done();
        });
    },
    jsFilePrompt: function() {
        var done = this.async();
        this.prompt({
            type    : 'confirm',
            name    : 'js',
            message : 'Do you have a jsFile?',
            default : false
        },
        function (answers) {
            var machineName = component.addDash(component.answers.name);
             if(answers.js) {
                 this.write(machineName + '/_' + machineName + '.js', "");
             }
            done();
        }.bind(this));
    },
    jsonFilePrompt: function() {
        var done = this.async();
        this.prompt({
                type    : 'confirm',
                name    : 'json',
                message : 'Do you have a json file?',
                default : false
            },
            function (answers) {
                var machineName = component.addDash(component.answers.name);
                if(answers.json) {
                    this.write(machineName + '/_' + machineName + '.json', "");
                }
                done();
            }.bind(this));
    },
    generateComponent: function() {
        var done = this.async();
        var answers = component.answers;

        var machineName = component.addDash(answers.name);
        var name = component.capitalizeString(answers.name);
        var subComponents = component.answers.subComponentNames;
        var modifiers = component.answers.modifierNames;

        this.template('styles.tpl.scss', machineName + '/_' + machineName + '.scss', {
            name: name,
            machineName: machineName,
            subComponents: subComponents,
            modifiers: modifiers
        });
        this.template('index.tpl.html', machineName + '/' + machineName + '.html', {
            name: name,
            machineName: machineName
        });
        done();
    }
});
