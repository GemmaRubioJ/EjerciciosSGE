({
        // Método de inicialización
        doInit : function(component, event, helper) {
            console.log('El componente Botones ha sido inicializado');
    
            // Configurar el estado inicial aquí
            component.set("v.isRecording", false);
            component.set("v.clickSequence", []);
            component.set("v.recordedSequences", []);

            var action = component.get("c.getSequence");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var sequence = response.getReturnValue();
                    if (sequence) {
                        component.set("v.loadedSequences", sequence.split(" "));
                    }
                } else {
                    console.log("Error al recuperar secuencias.");
                }
            });
            $A.enqueueAction(action);
    
        },
    
    
        // Manejar el click en los botones
        handleButtonClick : function(component, event, helper) {
            if (component.get("v.isRecording")) {
                var value = event.getSource().get("v.label");
                var clickSequence = component.get("v.clickSequence");
    
                // Si la secuencia ya tiene valores, añade una coma antes del nuevo valor
                if (clickSequence.length > 0) {
                    clickSequence += ",";
                }
                clickSequence += value;
    
                component.set("v.clickSequence", clickSequence);

            }
        },
    
        // Manejar el evento 
        handleRecordEvent : function(component, event, helper) {
            var action = event.getParam("action");

            if (action === "startRecording") {
                // Iniciar una nueva secuencia
                component.set("v.isRecording", true);
                component.set("v.clickSequence", "");

            } else if (action === "stopRecording") {
                // Detener grabación y almacenar la secuencia
                component.set("v.isRecording", false);
                var recordedSequences = component.get("v.recordedSequences");
                var clickSequence = component.get("v.clickSequence");
                recordedSequences.push(clickSequence);
                component.set("v.recordedSequences", recordedSequences);

                // Mostrar la secuencia en pantalla
                var displayedSequences = component.get("v.displayedSequences");
                displayedSequences.push(clickSequence);
                component.set("v.displayedSequences", displayedSequences);

            } else if (action === "playSequence") {
                // Reproducir secuencias
                helper.playSequence(component);
            
            }else if (action == "clearSequence") {
                //limpiar pantalla
                component.set("v.loadedSequences", []);
                component.set("v.displayedSequences", []);
            

            } else if (action == "saveSequence") {
                console.log("Guardando en base de datos");
                helper.saveSequence(component);
            }
        },

})
