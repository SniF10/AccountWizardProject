({
    init: function (component) {
        var recordId = component.get("v.recordId");
        if (recordId!==undefined && recordId!=='') {
            var action = component.get("c.getAccount");
            action.setParams({
                recordId: recordId
            });
            action.setCallback(this, function (response) {
                if (component && component.isValid()) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set("v.currentAccount", response.getReturnValue());
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        }
    }
});