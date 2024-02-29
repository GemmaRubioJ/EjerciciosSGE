import { LightningElement, api } from 'lwc';

export default class MyModal extends LightningElement {
    @api isOpen = false;
    @api title = 'Modal Title';
    @api message = 'Modal Message';

    closeModal() {
        this.isOpen = false;
    }
}