// Contact form -> sends the visitor's details to your inbox via Web3Forms.
// Setup: put your access key in the hidden "access_key" field in index.html.
$(function () {
    var $form = $('#contact-form');
    var $msg = $('.form-message');
    var $btn = $form.find('button[type="submit"]');

    function show(type, text) {
        $msg.removeClass('success error').addClass(type).text(text);
    }

    $form.on('submit', function (event) {
        event.preventDefault();

        if ($form.find('[name="access_key"]').val() === 'YOUR_ACCESS_KEY_HERE') {
            show('error', 'Contact form is not set up yet (missing access key).');
            return;
        }

        var data = {};
        $form.serializeArray().forEach(function (f) { data[f.name] = f.value; });
        if (!data.subject) { data.subject = 'New message from your portfolio website'; }

        $btn.prop('disabled', true).text('Sending...');
        show('', '');

        $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data)
        }).done(function (res) {
            if (res && res.success) {
                show('success', 'Thank you! Your message has been sent. I will get back to you soon.');
                $form[0].reset();
            } else {
                show('error', 'Sorry, something went wrong. Please email me at usamasajjad615@gmail.com.');
            }
        }).fail(function () {
            show('error', 'Sorry, your message could not be sent. Please email me at usamasajjad615@gmail.com.');
        }).always(function () {
            $btn.prop('disabled', false).text('Submit');
        });
    });
});
