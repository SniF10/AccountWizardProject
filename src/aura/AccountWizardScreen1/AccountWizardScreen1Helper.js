({
	validationRecord: function (component, event) {
		var params = event.getParam('arguments');
		var callback;
		if (params) {
			callback = params.callback;
		}

		var currentAccount = component.get("v.currentAccount");
		var valid;
		if (currentAccount.Name !== '') {
				var action = component.get("c.validAccount");
				action.setParams({
					name: currentAccount.Name
				});
				action.setCallback(this, function (response) {
					if (component && component.isValid()) {
						var state = response.getState();
						if (state === "SUCCESS") {
							valid = response.getReturnValue();
							if (valid) {
								if (callback) callback(response.getReturnValue());
							} else {
								var toastEvent = $A.get("e.force:showToast");
								toastEvent.setParams({
									"title": "Error:",
									"message": "This name is already use!"
								});
								toastEvent.fire();
							}
						} else {
							console.log("Unknown error");
						}
					}
				});
				$A.enqueueAction(action);
		} else {
			var toastEvent = $A.get("e.force:showToast");
			toastEvent.setParams({
				"title": "Error:",
				"message": "Please enter Account Name!"
			});
			toastEvent.fire();
		}
	}
});