// Creates new execution context to execute safe code
(function(global, $) {

    // Function to exposed in Global
    const Greetr = function(firstName, lastName, language) {
        // Uses Greet.init Function constructor to create and return a 'new' object
        return new Greetr.init(firstName, lastName, language);
    }

    // Contains all properties and methods attached to the object prototype returned by Greetr
    Greetr.prototype = {

    };

    // Object constructor function that sets default properties.
    Greetr.init = function(firstName, lastName, language) {

        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.language = language || '';

    }

    // Point the __proto__ of all objects created with Greetr.init to Greetr.prototype.
    Greetr.init.prototype = Greetr.prototype;

    // Exposing Greetr and the G$ alias to the global object(window).
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));