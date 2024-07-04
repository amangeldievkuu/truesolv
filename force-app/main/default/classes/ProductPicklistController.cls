public with sharing class ProductPicklistController {
    @AuraEnabled(cacheable=true)
    public static Map<String, List<String>> getPicklistValues() {
        Map<String, List<String>> picklistValues = new Map<String, List<String>>();

        Schema.SObjectType objectType = Product__c.SObjectType;
        Schema.DescribeSObjectResult describeResult = objectType.getDescribe();

        // Type picklist values
        Schema.DescribeFieldResult typeField = describeResult.fields.getMap().get('Type__c').getDescribe();
        List<Schema.PicklistEntry> typePicklistEntries = typeField.getPicklistValues();
        List<String> typeValues = new List<String>();
        for (Schema.PicklistEntry entry : typePicklistEntries) {
            typeValues.add(entry.getValue());
        }
        picklistValues.put('Type__c', typeValues);

        // Family picklist values
        Schema.DescribeFieldResult familyField = describeResult.fields.getMap().get('Family__c').getDescribe();
        List<Schema.PicklistEntry> familyPicklistEntries = familyField.getPicklistValues();
        List<String> familyValues = new List<String>();
        for (Schema.PicklistEntry entry : familyPicklistEntries) {
            familyValues.add(entry.getValue());
        }
        picklistValues.put('Family__c', familyValues);

        return picklistValues;
    }
}