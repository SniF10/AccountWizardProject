({
    init: function (component) {
        var recordId = component.get("v.recordId");
        var currentAccount = component.getReference("v.currentAccount");
        $A.createComponents([
                ["c:AccountWizardScreen1", {
                    currentAccount: currentAccount,
                    "aura:id": "screen1"
                }],
                ["c:AccountWizardScreen2", {
                    currentAccount: currentAccount,
                    recordId: recordId
                }],
                ["c:AccountWizardScreen3", {
                    currentAccount: currentAccount,
                    "aura:id": "screen3"
                }]
            ],
            function (listComponents, status, errorMessage) {
                component.set("v.listComponents", listComponents);
                var visibleComponent = component.get("v.visibleComponent");
                if (status === "SUCCESS") {
                    if (recordId === undefined) {
                        visibleComponent.push(listComponents[0]);
                        component.set("v.visibleComponent", visibleComponent);
                        component.set("v.blockPrev", true);
                    } else {
                        listComponents.shift();
                        visibleComponent.push(listComponents[0]);
                        component.set("v.listComponents", listComponents);
                        component.set("v.visibleComponent", visibleComponent);
                        component.set("v.blockPrev", true);
                    }
                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            });
    },

    next: function (component) {
        var listComponents = component.get("v.listComponents");
        if (listComponents[0].isRendered() && listComponents[0].getName() === 'cAccountWizardScreen1') {
            var childComponent = component.find("screen1");
            childComponent.validationRecord(function (checkSwitch) {
                if (checkSwitch) {
                    var visibleComponent = component.get("v.visibleComponent");
                    visibleComponent.splice(0, 1, listComponents[1]);
                    component.set("v.visibleComponent", visibleComponent);
                    component.set("v.blockPrev", false);
                }
            });
        } else {
            for (var i = 0; i < listComponents.length; i++) {
                if (listComponents[i].isRendered()) {
                    var visibleComponent = component.get("v.visibleComponent");
                    visibleComponent.splice(0, 1, listComponents[i + 1]);
                    component.set("v.visibleComponent", visibleComponent);
                    component.set("v.blockPrev", false);
                }
            }
            if (listComponents[listComponents.length - 2].isRendered()) {
                var nextButton = component.find("nextButton");
                var saveButton = component.find("saveButton");
                $A.util.addClass(nextButton, "slds-hide");
                $A.util.removeClass(saveButton, "slds-hide");
            }
        }

    },

    previous: function (component) {
        var listComponents = component.get("v.listComponents");
        for (var i = 0; i < listComponents.length; i++) {
            if (listComponents[i].isRendered()) {
                var visibleComponent = component.get("v.visibleComponent");
                visibleComponent.splice(0, 1, listComponents[i - 1]);
                component.set("v.visibleComponent", visibleComponent);
                component.set("v.blockPrev", false);
            }

        }
        if (listComponents[1].isRendered()) {
            component.set("v.blockPrev", true);
        }
        var nextButton = component.find("nextButton");
        var saveButton = component.find("saveButton");
        $A.util.removeClass(nextButton, "slds-hide");
        $A.util.addClass(saveButton, "slds-hide");
    },

    save: function (component) {
        var childComponent = component.find("screen3");
        childComponent.validationFields();
        /* if(result){
             component.find('overlayModal').notifyClose();
         }else {
             var toastEvent = $A.get("e.force:showToast");
             toastEvent.setParams({
                 "title": "Error:",
                 "message": "404"
             });
             toastEvent.fire();
         }*/
    }
});