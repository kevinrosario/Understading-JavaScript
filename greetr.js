// Creates new execution context to execute safe code
(function(global, $) {

    // Function to exposed in Global
    const Greetr = function(firstName, lastName, language) {
        // Uses Greet.init Function constructor to create and return a 'new' object
        return new Greetr.init(firstName, lastName, language);
    }

    // Hidden within IIFE scope and not available outside
    const supportedLanguages = ['en', 'es'];

    const greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    const formalGreeting = {
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
        formalGreeting: function() {
            return formalGreeting[this.language] + ', ' + this.fullName();
        },
        greet: function(formal) {
            let msg;
            
            if(formal) {
                msg = this.formalGreeting();
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
        },
        pageGreeting: function(selector, formal) {
            // checks for jQuery
            if(!$) throw 'jQuery not loaded';
            // Checks for passed selector
            if(!selector) throw 'Missing jQuery Selector';

            // set the msg to be displayed
            let msg = (formal ? this.formalGreeting() : this.greeting());

            // set the msg in the HTML element
            $(selector).html(msg);

            // method can be chained
            return this;
        }
    };

    // Object constructor function that sets default properties.
    Greetr.init = function(firstName, lastName, language) {

        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.language = language || 'en';

        // validates language when creating the object.
        this.validate();
    }

    // Point the __proto__ of all objects created with Greetr.init to Greetr.prototype.
    Greetr.init.prototype = Greetr.prototype;

    // Exposing Greetr and the G$ alias to the global object(window).
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));