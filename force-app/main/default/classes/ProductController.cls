public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getProducts() {
        try {
            return [SELECT Id, Name, Description__c, Type__c, Family__c, Image__c, Price__c FROM Product__c];
        } catch (Exception e) {
            throw new AuraHandledException('An error occurred while fetching products: ' + e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Product__c> searchProducts(String searchTerm) {
        String query = '%' + searchTerm + '%';
        return [SELECT Id, Name, Description__c, Type__c, Family__c, Image__c, Price__c 
                FROM Product__c WHERE Name LIKE :query OR Description__c LIKE :query];
    }
}
