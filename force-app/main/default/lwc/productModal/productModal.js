import { LightningElement, api } from 'lwc';

export default class ProductModal extends LightningElement {
    @api product;

    closeModal() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}