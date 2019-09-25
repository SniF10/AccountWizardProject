({
    init: function (component) {
        var contactList = component.get("v.contactsList");
        contactList.push({});
        component.set("v.contactsList", contactList);
    },

    beforeInsertRecords: function (component, event, helper) {
        helper.beforeInsertRecords(component, event);
    },

    addDeleteFields: function (component, event, helper) {
        helper.addDeleteFields(component, event);
    },
    validationFields:function (component, event, helper) {
        helper.validationFields(component,event)

    }
});