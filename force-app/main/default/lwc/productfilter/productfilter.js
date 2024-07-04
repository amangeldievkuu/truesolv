import { LightningElement, api, wire } from 'lwc';
import getPicklistValues from '@salesforce/apex/ProductPicklistController.getPicklistValues';

export default class Productfilter extends LightningElement {
    @api selectedTypes = [];
    @api selectedFamilies = [];

    typeOptions = [];
    familyOptions = [];
    
    @wire(getPicklistValues)
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.typeOptions = data.Type__c.map(value => ({ label: value, value }));
            this.familyOptions = data.Family__c.map(value => ({ label: value, value }));
        } else if (error) {
            console.error('Error fetching picklist values:', error);
        }
    }

    handleTypeChange(event) {
        this.selectedTypes = Array.from(event.target.selectedOptions, option => option.value);
        this.dispatchEvent(new CustomEvent('filterchange', { 
            detail: { types: this.selectedTypes, families: this.selectedFamilies }
        }));
    }

    handleFamilyChange(event) {
        this.selectedFamilies = Array.from(event.target.selectedOptions, option => option.value);
        this.dispatchEvent(new CustomEvent('filterchange', { 
            detail: { types: this.selectedTypes, families: this.selectedFamilies }
        }));
    }
}