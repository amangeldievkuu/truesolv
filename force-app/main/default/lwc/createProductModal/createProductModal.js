import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createProduct from '@salesforce/apex/ProductController.createProduct';


export default class CreateProductModal extends LightningElement {
    @track productName = '';
    @track productDescription = '';
    @track productPrice = 0;

    handleNameChange(event) {
        this.productName = event.target.value;
    }

    handlePriceChange(event){
        this.productPrice = event.target.value;
    }

    handleDescriptionChange(event) {
        this.productDescription = event.target.value;
    }

    closeModal() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }

    saveProduct() {
        createProduct({ name: this.productName, description: this.productDescription, price: this.productPrice })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Product created successfully',
                        variant: 'success',
                    }),
                );
                this.closeModal();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating product',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}