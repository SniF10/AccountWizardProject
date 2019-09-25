({
    init: function (component, event, helper) {
        helper.init(component);
    },

    cancel: function (component) {
        component.find('overlayModal').notifyClose();
    },

    next: function (component, event, helper) {
        helper.next(component);
    },

    previous: function (component, event, helper) {
        helper.previous(component);
    },
    save: function (component, event, helper) {
        helper.save(component);
    }
})