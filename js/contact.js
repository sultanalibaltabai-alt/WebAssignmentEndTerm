const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 300;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_PATTERN = /^[\p{L}\s'-]+$/u;

const contactForm = document.getElementById('contact-form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const topicField = document.getElementById('topic');
const messageField = document.getElementById('message');
const messageCounter = document.getElementById('message-counter');

function validateName(value) {
    const name = value.trim();
    if (name === '') {
        return 'Please enter your name.';
    }
    if (name.length < MIN_NAME_LENGTH) {
        return 'Name must have at least ' + MIN_NAME_LENGTH + ' letters.';
    }
    if (!NAME_PATTERN.test(name)) {
        return 'Name can contain only letters.';
    }
    return '';
}

function validateEmail(value) {
    const email = value.trim();
    if (email === '') {
        return 'Please enter your email.';
    }
    if (!EMAIL_PATTERN.test(email)) {
        return 'Email must look like name@example.com.';
    }
    return '';
}

function validateTopic(value) {
    if (value === '') {
        return 'Please choose a topic.';
    }
    return '';
}

function validateMessage(value) {
    const message = value.trim();
    if (message === '') {
        return 'Please write a message.';
    }
    if (message.length < MIN_MESSAGE_LENGTH) {
        return 'Message must have at least ' + MIN_MESSAGE_LENGTH + ' characters.';
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
        return 'Message must have no more than ' + MAX_MESSAGE_LENGTH + ' characters.';
    }
    return '';
}

const fieldRules = [
    { field: nameField, validate: validateName },
    { field: emailField, validate: validateEmail },
    { field: topicField, validate: validateTopic },
    { field: messageField, validate: validateMessage }
];

function showFieldError(field, errorText) {
    const errorElement = document.getElementById(field.id + '-error');
    errorElement.textContent = errorText;
    field.classList.toggle('invalid', errorText !== '');
    field.classList.toggle('valid', errorText === '');
}

function checkField(rule) {
    const errorText = rule.validate(rule.field.value);
    showFieldError(rule.field, errorText);
    return errorText === '';
}

function clearValidation() {
    for (const rule of fieldRules) {
        rule.field.classList.remove('invalid', 'valid');
        document.getElementById(rule.field.id + '-error').textContent = '';
    }
}

function updateMessageCounter() {
    messageCounter.textContent = messageField.value.length + ' / ' + MAX_MESSAGE_LENGTH;
}

function createSuccessText(name, wantsReply) {
    const replyText = wantsReply ? 'We will reply to your email soon.' : 'We have received your message.';
    return 'Thank you, ' + name.trim() + '! ' + replyText;
}

function handleSubmit(event) {
    event.preventDefault();
    hideSuccess();

    let firstInvalidField = null;
    for (const rule of fieldRules) {
        const isValid = checkField(rule);
        if (!isValid && firstInvalidField === null) {
            firstInvalidField = rule.field;
        }
    }

    if (firstInvalidField !== null) {
        shakeForm();
        firstInvalidField.focus();
        return;
    }

    const wantsReply = contactForm.elements.reply.value === 'yes';
    showSuccess(createSuccessText(nameField.value, wantsReply));
    contactForm.reset();
    clearValidation();
    updateMessageCounter();
}

function watchField(rule) {
    rule.field.addEventListener('blur', function () {
        checkField(rule);
    });
    rule.field.addEventListener('input', function () {
        if (rule.field.classList.contains('invalid')) {
            checkField(rule);
        }
    });
}

for (const rule of fieldRules) {
    watchField(rule);
}

messageField.addEventListener('input', updateMessageCounter);
contactForm.addEventListener('submit', handleSubmit);
