import { LightningElement, wire, track } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import searchProducts from '@salesforce/apex/ProductController.searchProducts';

export default class Productlist extends LightningElement {
    @track products;
    @track error;

    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
        } else if (error) {
            this.error = error;
            this.products = undefined;
        }
    }

    handleSearchChange(event) {
        var searchTerm = event.target.value;
        if (searchTerm) {
            searchProducts({ searchTerm })
                .then((result) => {
                    this.products = result;
                    this.error = undefined;
                })
                .catch((error) => {
                    this.error = error;
                    this.products = undefined;
                });
        } else {
            // If the search term is empty, load all products
            getProducts()
                .then((result) => {
                    this.products = result;
                    this.error = undefined;
                })
                .catch((error) => {
                    this.error = error;
                    this.products = undefined;
                });
        }
    }

    handleViewDetails(event) {
        const product = event.detail;
        console.log('Viewing details for product:', product);
    }

    handleAddToCart(event) {
        const product = event.detail;
        console.log('Adding product to cart:', product);
    }
}