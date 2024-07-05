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

    @AuraEnabled(cacheable=true)
    public static Boolean isUserManager() {
        User currentUser = [SELECT IsManager__c FROM User WHERE Id = :UserInfo.getUserId()];
        return currentUser.IsManager__c;
    }

    @AuraEnabled
    public static Product__c createProduct(String name, String description, Integer price) {
        Product__c newProduct = new Product__c(
            Name = name,
            Description__c = description,
            Price__c = price
        );
        insert newProduct;
        return newProduct;
    }
}
