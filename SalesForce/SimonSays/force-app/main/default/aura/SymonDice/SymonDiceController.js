({

    // Método de inicialización
    doInit: function (component, event, helper) {
        console.log('El componente SymonDice ha sido inicializado');

        // Configurar el estado inicial aquí
        component.set("v.isRecording", false);
        component.set("v.clickSequence", []);

        // Cualquier otra lógica de inicialización puede ir aquí
    },
    startPlayerOneTurn: function (component, event, helper) {
        console.log("iniciando JUGADOR 1");
        //Disparar el evento de cambio de color de botones para jugador 2
        var changeEvent = $A.get("e.c:ChangeButtonClassEvent");
        changeEvent.setParams({ "styleClass": "playerOneButton" });
        changeEvent.fire();
        // Iniciar el turno del jugador 1
        component.set("v.currentPlayer", 1);
        component.set("v.isRecording", true);
        component.set("v.clickSequence", "");
    },

    startPlayerTwoTurn: function (component, event, helper) {
        console.log("iniciando JUGADOR 2");
        //Disparar el evento de cambio de color de botones para jugador 2
        var changeEvent = $A.get("e.c:ChangeButtonClassEvent");
        changeEvent.setParams({ "styleClass": "playerTwoButton" });
        changeEvent.fire();
        // Iniciar el turno del jugador 2
        component.set("v.currentPlayer", 2);
        component.set("v.isRecording", true);
        component.set("v.clickSequence", "");
    },


    //Activar los rectangulos clickados por el usuario en orden
    playSequence: function (component, event, helper) {
        let clickSequenceString = component.get("v.clickSequence");
        let clickSequence = clickSequenceString.split(",");
        let index = 0;

        function activateRectangle(rectangleColor) {
            if (rectangleColor) {
                component.set("v.isActive" + rectangleColor.charAt(0).toUpperCase() + rectangleColor.slice(1), true);
                console.log("Activando: ", rectangleColor);
                setTimeout(function () {
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
                component.set("v.shouldPlaySequence", false);
            }
        }

        playNext();
    },

    handleRectangleClick: function (component, event, helper) {
        if (component.get("v.isRecording")) {
            var color = event.currentTarget.dataset.color;
            var clickSequence = component.get("v.clickSequence");

            // Si la secuencia ya tiene colores, añade una coma antes del nuevo color
            if (clickSequence.length > 0) {
                clickSequence += ",";
            }
            clickSequence += color;

            component.set("v.clickSequence", clickSequence);

            //console.log("Click en color:", color);
            //console.log("Secuencia actual de clicks:", clickSequence);
        }
    },

    handleRecordEvent: function (component, event, helper) {
        var self = this;
        var action = event.getParam("action");

        if (action === "startRecording") {
            console.log("Iniciando la grabación");
            component.set("v.isRecording", true);

        } else if (action === "stopRecording") {
            console.log("Deteniendo grabación");
            // Detener la grabación y almacenar la secuencia según el jugador actual
            var currentPlayer = component.get("v.currentPlayer");
            var clickSequence = component.get("v.clickSequence");
            console.log("Current Player:", currentPlayer); // Diagnóstico

            if (currentPlayer === 1) {
                component.set("v.playerOneSequence", clickSequence);
            } else if (currentPlayer === 2) {
                component.set("v.playerTwoSequence", clickSequence);
                // Llama a validatePlayerTwoSequence para comparar las secuencias
                helper.validatePlayerTwoSequence(component);
            }

            component.set("v.isRecording", false);
        } else if (action === "playSequence") {
            component.set("v.isRecording", false);
            component.set("v.shouldPlaySequence", true);
        }
    },

    closeModal: function (component, event, helper) {
        console.log("CERRANDO Modal");
        component.set("v.showModal", false); // Asegúrate de que esta variable controle la visibilidad del modal
    }

})
