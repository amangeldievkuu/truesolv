import { LightningElement, api } from 'lwc';

export default class Producttile extends LightningElement {
    @api product;

    handleDetails() {
        const detailEvent = new CustomEvent('viewdetails', { detail: this.product });
        this.dispatchEvent(detailEvent);
    }

    handleAdd() {
        const addEvent = new CustomEvent('addtocart', { detail: this.product });
        this.dispatchEvent(addEvent);
    }
}