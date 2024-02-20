({
    playSequence : function(component) {
        let recordedSequences = component.get("v.recordedSequences");
        let index = 0;

        function playNextSequence() {
            if (index < recordedSequences.length) {
                console.log("Secuencia " + (index + 1) + ": " + recordedSequences[index]);

                setTimeout(function() {
                    index++;
                    playNextSequence();
                }, 1200);
            }
        }

        playNextSequence();
    },

    saveSequence : function(component, event, helper) {
        var action = component.get("c.updateSequence");
        var recordedSequences = component.get("v.recordedSequences").join(" "); // Une las secuencias con espacios

        action.setParams({ "newSequence": recordedSequences });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Secuencias guardadas correctamente.");
            } else {
                console.log("Error al guardar secuencias.");
            }
        });

        $A.enqueueAction(action);
    }
})
