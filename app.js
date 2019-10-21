
$('#lang').change(function(event) {
    const lang = $('#lang').val();
    const buttonText = lang === 'en' ? 'Press Me!' : '¡Presioname!';
    $('#login').val(buttonText);
});

$('#login').on('click', function() {

    let lang = $('#lang').val();
    // Used greetr library to create a new object and used the pageGreeting and log methods.
    G$('John', 'Doe', lang).pageGreeting('#greeting', true).log();

});
