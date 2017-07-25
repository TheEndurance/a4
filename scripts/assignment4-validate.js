var ErrorMessages = function () {
    var compoundErrorMessages = [];
    var compoundErrorTitle = document.getElementById("error-title");

    var ErrorDictionary = {
        "postal-code": "Incorrect postal code, acceptable formats are N2L 2S3 or N2L-2S3 or N2L2S3",
        "phone-number": "Incorrect phone number, acceptable formats are (999)-999-9999 or (999) 999 9999 or (999)9999999",
        "name": "The Name field is required",
        "city": "The City field is required",
        "address": "The Address field is required",
        "province": "The Province field is required",
    }
    var ValidationRules = {
        "postal-code": /^[A-Za-z]\d[A-Za-z][-\s]?\d[A-Za-z]\d$/,
        "phone-number": /^[(]{1}[0-9]{3}[)]{1}[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/,
        "name": /[^]+/,
        "city": /[^]+/,
        "address": /[^]+/,
        "province": /[^]+/,
    }

    var AddErrorMessage = function (id, message) {
        'use strict';
        var newId = id + "Error";
        //check for existence of the span
        var span = document.getElementById(newId);
        if (span) {
            span.firstChild.value = message;
        } else {
            ErrorUtilities.AppendToParent(id, message, "span", newId, "text-danger");
            ErrorUtilities.FocusOnElement(id);
        }
        ErrorUtilities.AddClassOnParentElement(id, "form-group", "has-error");
    }
    var RemoveErrorMessage = function (id) {
        'use strict';
        var span = document.getElementById(id + "Error");
        if (span) {
            span.parentNode.removeChild(span);
        }
        ErrorUtilities.RemoveClassOnParentElement(id, "form-group", "has-error");
    }
    var AddCompoundErrorMessage = function (message) {
        "use strict";
        for (var i = 0; i < compoundErrorMessages.length; i++) {
            if (compoundErrorMessages[i] == message) {
                return;
            }
        }
        compoundErrorMessages.push(message);
    }
    var RemoveCompoundErrorMessage = function (message) {
        "use strict";
        for (var i = 0; i < compoundErrorMessages.length; i++) {
            if (compoundErrorMessages[i] == message) {
                compoundErrorMessages.splice(i, 1);
                break;
            }
        }
    }

    var UpdateCompoundErrors = function () {
        "use strict";
        var compoundErrorLists = document.getElementById("compound-error-list");
        var tempCompoundList = "";

        if (compoundErrorMessages.length > 0) {
            compoundErrorTitle.textContent = "Correct the following errors:";
            compoundErrorTitle.classList.add("text-danger");
            for (var i = 0; i < compoundErrorMessages.length; i++) {
                tempCompoundList += '<li class="text-danger">' + compoundErrorMessages[i] + '</li>';
            }
            compoundErrorLists.innerHTML = tempCompoundList;

        } else {
            compoundErrorLists.innerHTML = "";
            compoundErrorTitle.textContent = "";
            compoundErrorTitle.classList.remove("text-danger");
        }
    }
    return {
        AddErrorMessage: AddErrorMessage,
        RemoveErrorMessage: RemoveErrorMessage,
        AddCompoundErrorMessage: AddCompoundErrorMessage,
        RemoveCompoundErrorMessage: RemoveCompoundErrorMessage,
        UpdateCompoundErrors: UpdateCompoundErrors,
        ErrorDictionary: ErrorDictionary,
        ValidationRules: ValidationRules,
        compoundErrorMessages: compoundErrorMessages
    }
}();

var FormController = function (errorMessages) {
    //private variables
    var nameInput, postalCodeInput, phoneNumberInput, addressInput, cityInput, provinceSelect;

    var InitializeInputFields = function () {
        "use strict";
        nameInput = document.getElementById("name");
        postalCodeInput = document.getElementById("postal-code");
        phoneNumberInput = document.getElementById("phone-number");
        addressInput = document.getElementById("address");
        cityInput = document.getElementById("city");
        provinceSelect = document.getElementById("province");
    }();

    var ValidateSubmission = function (e) {
        "use strict";
        var id = e.target.id;
        try {
            for (var key in errorMessages.ErrorDictionary) {
                if (document.forms[id][key].value == null || !errorMessages.ValidationRules[key].test(document.forms[id][key].value)) {
                    errorMessages.AddErrorMessage(key, errorMessages.ErrorDictionary[key]);
                    errorMessages.AddCompoundErrorMessage(errorMessages.ErrorDictionary[key]);
                    errorMessages.UpdateCompoundErrors();
                }
            }
        } catch (exception) {
            console.log(exception);
        }
        if (errorMessages.compoundErrorMessages.length > 0) {
            e.preventDefault();
        }

    }
    return {
        phone: phoneNumberInput,
        postal: postalCodeInput,
        city: cityInput,
        address: addressInput,
        name: nameInput,
        province: provinceSelect,
        ValidateSubmission: ValidateSubmission,
    }
}(ErrorMessages);