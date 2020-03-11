"use strict";

const urlRegEx = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

class Validator {
    constructor(str) {
        this._str = str
    }

    /**
     *
     * @return {boolean}
     */
    checkPattern() {
        new Error('Method not implemented');
    }
}

class EmailValidator extends Validator{
    checkPattern() {
        return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(this._str);
    }
}

class PhoneValidator extends Validator {
    checkPattern() {
        return /^\+375 \((29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(this._str);
    }
}

class UrlValidator extends Validator {
    checkPattern() {
        return urlRegEx.test(this._str);
    }
}

function checkPhoneNumber() {
    let phoneNumber = document.querySelector('#exe2 input[name="phoneNumber"]');
    if (new PhoneValidator(phoneNumber.value).checkPattern()) {
        phoneNumber.style.color = 'black';
    } else {
        phoneNumber.style.color = 'red';
    }
}

function checkEmail() {
    let email = document.querySelector('#exe2 input[name="email"]');
    if (new EmailValidator(email.value).checkPattern()) {
        email.style.color = 'black';
    } else {
        email.style.color = 'red';
    }
}

function checkUrl() {
    let url = document.querySelector('#exe2 input[name="url"]');
    if (new UrlValidator(url.value).checkPattern()) {
        url.style.color = 'black';
    } else {
        url.style.color = 'red';
    }
}