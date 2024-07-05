import { LightningElement, api, wire, track } from 'lwc';

export default class Producttile extends LightningElement {
    @api product;
    @track isModalOpen = false;

    

    handleDetailsClick() {
        this.isModalOpen = true;
    }

    handleModalClose() {
        this.isModalOpen = false;
    }
}