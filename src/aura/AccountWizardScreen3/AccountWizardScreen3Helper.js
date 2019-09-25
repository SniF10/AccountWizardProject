({
    beforeInsertRecords: function (component, event, helper) {
        console.log('beforeInsertRecords');
        var result = event.getParam("result");
        var contactList = component.get("v.contactsList");
        var resultList = component.get("v.resultList");
        resultList.push(result);
        component.set("v.resultArray",resultList);
        console.log(resultList);
        console.log(resultList.length === contactList.length);
        console.log(resultList.length);
        console.log(contactList.length);
        console.log(resultList.reduce(function (valid, resultList) {return valid && resultList;}, true));
        if (resultList.length === contactList.length) {
            console.log('====');
            if(resultList.reduce(function (valid, resultList) {return valid && resultList;}, true)){
                console.log('reduce = true');
                this.insertRecords(component);
            }else {
                console.log('reduce = false');
                component.set("v.resultArray",'');
            }

        }
    },

    insertRecords: function (component) {
        console.log('insertRecords');
        var currentAccount = component.get("v.currentAccount");
        var contactsList = component.get("v.contactsList");
        if (currentAccount.Name !== '' && contactsList[0].LastName !== '') {
            var action = component.get("c.insertRec");
            action.setParams({
                currentAccount: currentAccount,
                contactsList: contactsList
            });
            action.setCallback(this, function (response) {
                if (component && component.isValid()) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        console.log("SUCCESS");
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },

    validationFields: function (component) {
        console.log('validationFields Screen3');
        var childComponent = component.find("accountContact");
        if (childComponent.length === undefined) {
            childComponent.validationFields();
        }
        for (var i = 0; i < childComponent.length; i++) {
            childComponent[i].validationFields();
        }
    },

    addDeleteFields: function (component, event) {
        var index = event.getParam("index");
        var add = event.getParam("add");
        var contactList = component.get("v.contactsList");
        if (add) {
            component.set("v.hideButton", false);
            contactList.push({});
            component.set("v.contactsList", contactList);
        } else {
            if (contactList.length === 2) {
                component.set("v.hideButton", true);
            }
            contactList.splice(index, 1);
            component.set("v.contactsList", contactList);


        }

    }
});