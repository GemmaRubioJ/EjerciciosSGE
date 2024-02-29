({
    validatePlayerTwoSequence: function (component) {
        var playerOneSequence = component.get("v.playerOneSequence");
        var playerTwoSequence = component.get("v.clickSequence");

        console.log('Player One Sequence:', playerOneSequence);
        console.log('Player Two Sequence:', playerTwoSequence);


        if (playerOneSequence === playerTwoSequence) {
            component.set("v.modalMessage", "JUGADOR 2 ACERTÓ");
            console.log('El jugador 2 acertó la secuencia');
            var playerTwoScore = component.get("v.playerTwoScore");
            component.set("v.playerTwoScore", playerTwoScore + 1);
        } else {
            component.set("v.modalMessage", "JUGADOR 2 FALLÓ");
            console.log('El jugador 2 falló la secuencia');
        }
        console.log("Antes de mostrar el modal: ", component.get("v.showModal"));
        // Muestra el modal con el mensaje
        component.set("v.showModal", true);
        console.log("Después de mostrar el modal: ", component.get("v.showModal"));
        // Espera un poco antes de cerrar el modal automáticamente, si así lo deseas
        window.setTimeout($A.getCallback(function () {
            if (component.isValid()) {
                // Cierra el modal después de un retraso
                this.closeModal(component);
            }
        }.bind(this)), 2000); // Cierra el modal después de 2 segundos

        component.set("v.isRecording", false);
        component.set("v.clickSequence", "");
        this.resetSequences(component);
    },

    closeModal: function (component) {
        component.set("v.showModal", false);
    },

    resetSequences: function (component) {
        component.set("v.playerOneSequence", "");
        component.set("v.playerTwoSequence", "");
    }
})
