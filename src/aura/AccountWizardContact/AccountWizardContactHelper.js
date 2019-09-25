({
    validationFields: function (component, event) {
        var compEvent = component.getEvent("ResultValidationEvent");
        var contact = component.get("v.contact");
        var result = false;
        if (contact.FirstName !== '' && contact.FirstName !== undefined) {
            if (contact.LastName === undefined || contact.LastName === '') {
                component.set("v.message", 'Enter this field');
            }
            if (contact.Email === undefined || contact.Email === '') {
                component.set("v.messageEmail", 'Enter this field');
            }
        } else {
            component.set("v.messageEmail", '');
            component.set("v.message", '');
            result = true;
        }
        if (contact.LastName !== '' && contact.LastName !== undefined) {
            if (contact.Email === undefined || contact.Email === '') {
                component.set("v.message", '');
                component.set("v.messageEmail", 'Enter this field');
            }
        }
        if (contact.Email !== '' && contact.Email !== undefined) {
            if (contact.LastName === undefined || contact.LastName === '') {
                component.set("v.messageEmail", '');
                component.set("v.message", 'Enter this field');
            }
        }
        if (contact.Email !== '' && contact.Email !== undefined &&
            contact.LastName !== '' && contact.LastName !== undefined) {
            component.set("v.messageEmail", '');
            component.set("v.message", '');
            result = true;
        }
        compEvent.setParams({
            result: result
        });
        compEvent.fire();
    }
});