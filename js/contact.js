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

    const firstInvalidField = checkAllFields(fieldRules);

    if (firstInvalidField !== null) {
        shakeForm();
        firstInvalidField.focus();
        return;
    }

    const wantsReply = contactForm.elements.reply.value === 'yes';
    showSuccess(createSuccessText(nameField.value, wantsReply));
    contactForm.reset();
    clearValidation(fieldRules);
    updateMessageCounter();
}

for (const rule of fieldRules) {
    watchField(rule);
}

messageField.addEventListener('input', updateMessageCounter);
contactForm.addEventListener('submit', handleSubmit);
