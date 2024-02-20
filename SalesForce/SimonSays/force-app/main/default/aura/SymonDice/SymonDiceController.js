({

    // Método de inicialización
    doInit : function(component, event, helper) {
        console.log('El componente SymonDice ha sido inicializado');

        // Configurar el estado inicial aquí
        component.set("v.isRecording", false);
        component.set("v.clickSequence", []);

        // Cualquier otra lógica de inicialización puede ir aquí
    },
    

    //Activar los rectangulos clickados por el usuario en orden
    playSequence : function(component, event, helper) {
        console.log("Iniciando PlaySequence");
        let clickSequenceString = component.get("v.clickSequence");
        let clickSequence = clickSequenceString.split(",");
        let index = 0;

        function activateRectangle(rectangleColor) {
            if (rectangleColor) {
                component.set("v.isActive" + rectangleColor.charAt(0).toUpperCase() + rectangleColor.slice(1), true);
                console.log("Activando: ", rectangleColor);
                setTimeout(function() {
                    component.set("v.isActive" + rectangleColor.charAt(0).toUpperCase() + rectangleColor.slice(1), false);
                    index++;
                    if (index < clickSequence.length) {
                        setTimeout(playNext, 300); // Espera antes de activar el siguiente
                    }
                }, 500); // Duración del efecto activo
            }
        }

        function playNext() {
            if (index < clickSequence.length) {
                let color = clickSequence[index];
                activateRectangle(color);
            }
        }

        playNext();
    },

    handleRectangleClick : function(component, event, helper) {
        console.log("Entrando en handleRectangleClick, isRecording:", component.get("v.isRecording"));
        if (component.get("v.isRecording")) {
            var color = event.currentTarget.dataset.color;
            var clickSequence = component.get("v.clickSequence");
        
            // Si la secuencia ya tiene colores, añade una coma antes del nuevo color
            if (clickSequence.length > 0) {
               clickSequence += ",";
            }
            clickSequence += color;

            component.set("v.clickSequence", clickSequence);

            console.log("Click en color:", color);
            console.log("Secuencia actual de clicks:", clickSequence);
        }
    },

    handleRecordEvent : function(component, event, helper) {
        var action = event.getParam("action");
        console.log("Action recieve");
        if (action === "startRecording") {
            console.log("Iniciando la grabación");
            component.set("v.isRecording", true);
            console.log("Estado de isRecording: ", component.get("v.isRecording"));
        } else if (action === "stopRecording") {
            console.log("Deteniendo la grabación");
            component.set("v.isRecording", false);
            console.log("Secuencia final de clicks:", component.get("v.clickSequence"));
            console.log("Estado de isRecording: ", component.get("v.isRecording"));
        } else if (action === "playSequence") {
            console.log("Deteniendo la grabación");
            component.set("v.isRecording", false);
            component.set("v.shouldPlaySequence", true);
            console.log("Secuencia final de clicks:", component.get("v.clickSequence"));
            component.set("v.shouldPlaySequence", false);
        }
        console.log("Estado de isRecording después de handleRecordEvent:", component.get("v.isRecording"));
    }

})
