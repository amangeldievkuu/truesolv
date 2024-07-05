import { LightningElement, wire ,track} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';
import isUserManager from '@salesforce/apex/ProductController.isUserManager';

const fields = [ACCOUNT_NAME_FIELD, ACCOUNT_NUMBER_FIELD];

export default class Topcomponent extends LightningElement {
    recordId;
    account;
    @track isManager = false;
    @track isCreateProductModalOpen = false;
  

    @wire(isUserManager)
    wiredIsManager({ error, data }) {
        if (data) {
            this.isManager = data;
        } else if (error) {
            this.isManager = false;
            console.error('Error:', error);
        }
    }

    handleCreateProductClick() {
        this.isCreateProductModalOpen = true;
    }

    handleCreateProductModalClose() {
        this.isCreateProductModalOpen = false;
    }
    

    @wire(CurrentPageReference)
    getCurrentPageReference(pageRef) {
        if (pageRef) {
            this.recordId = pageRef.state.c__recordId;
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredAccount({ error, data }) {
        if (data) {
            this.account = data;
        } else if (error) {
            console.error('Error retrieving account data', error);
        }
    }

    get accountName() {
        return this.account?.fields?.Name?.value ?? 'No Account Name';
    }

    get accountNumber() {
        return this.account?.fields?.AccountNumber?.value ?? 'No Account Number';
    }
}