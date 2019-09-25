({
	createComponent : function(component) {
		$A.createComponent("c:AccountWizard",
			{},
			function(result, status) {
				if (status === "SUCCESS") {
					component.find('overlayLib').showCustomModal({
						body: result,
						showCloseButton: true
					})
				}
			});

	}
});
