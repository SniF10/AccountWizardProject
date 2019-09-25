({
    init: function (component) {
        if (component.get("v.index") === 0) {
            var removeIcon = component.find("removeIcon");
            $A.util.addClass(removeIcon, "slds-hide");
        }
    },

    change: function (component) {
        var hideButton = component.get("v.hideButton");
        var removeIcon = component.find("removeIcon");
        if (hideButton) {
            $A.util.addClass(removeIcon, "slds-hide");
        } else {
            $A.util.removeClass(removeIcon, "slds-hide");
        }
    },


    addContact: function (component) {
        var compEvent = component.getEvent("ContactAddWizardEvent");
        compEvent.setParams({
            add: true
        });
        compEvent.fire();
    },

    removeContact: function (component) {
        var compEvent = component.getEvent("ContactAddWizardEvent");
        compEvent.setParams({
            add: false,
            index: component.get("v.index")
        });
        compEvent.fire();
    },

    validationFields: function (component, event, helper) {
        console.log('validationFields1234');
        helper.validationFields(component, event);
    }

});