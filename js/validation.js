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

function checkAllFields(rules) {
    let firstInvalidField = null;
    for (const rule of rules) {
        const isValid = checkField(rule);
        if (!isValid && firstInvalidField === null) {
            firstInvalidField = rule.field;
        }
    }
    return firstInvalidField;
}

function clearValidation(rules) {
    for (const rule of rules) {
        rule.field.classList.remove('invalid', 'valid');
        document.getElementById(rule.field.id + '-error').textContent = '';
    }
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
