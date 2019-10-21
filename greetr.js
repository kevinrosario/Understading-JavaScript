// Creates new execution context to execute safe code
(function(global, $) {

    // Function to exposed in Global
    const Greetr = function(firstName, lastName, language) {
        // Uses Greet.init Function constructor to create and return a 'new' object
        return new Greetr.init(firstName, lastName, language);
    }

    // By defining variables outside the function scope we make sure that developers can not change them
    const supportedLanguages = ['en', 'es'];

    const greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    const formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    const logMessages = {
        en: 'Logged In',
        es: 'Inicio de sesion'
    }

    // Contains all properties and methods attached to the object prototype returned by Greetr
    Greetr.prototype = {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        validate: function () {
            if (supportedLanguages.indexOf(this.language) === -1 ) {
                throw "Invalid language"
            }
        },
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        formalGreetings: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        greet: function(formal) {
            let msg;
            
            if(formal) {
                msg = this.formalGreetings();
            } else {
                msg = this.greeting();
            }
            
            if(console) {
                console.log(msg)
            }

            // Returning 'this' makes the method chainable 
            return this;
        },
        log: function() {
            if(console) {
                console.log(logMessages[this.language] + ': ' +  this.fullName());
            }

            return this;
        },
        setLang: function(lang) {
            this.language = lang;

            this.validate(lang);
            
            return this;
        }
    };

    // Object constructor function that sets default properties.
    Greetr.init = function(firstName, lastName, language) {

        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.language = language || 'en';

    }

    // Point the __proto__ of all objects created with Greetr.init to Greetr.prototype.
    Greetr.init.prototype = Greetr.prototype;

    // Exposing Greetr and the G$ alias to the global object(window).
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));