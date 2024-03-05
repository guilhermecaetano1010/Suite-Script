/**
 * @NScriptType Suitelet
 * @NApiVersion 2.0
 */

define(['N/record', 'N/redirect', 'N/ui/serverWidget'],
/**
 * @param {record} record
 * @param {redirect} redirect 
 * @param {serverWidget} serverWidget 
 */

function (record, redirect, serverWidget ) {

    /**
     * Definition of the Suitlet script trigger point.
     * 
     * @param {Object} scriptContext
     * @param {Object} scriptContext.newRecord - New record
     * @param {Object} scriptContext.oldRecord - Old record
     * @Since 2016.1
     */

    function onRequest(scriptContext){
        
        var request = scriptContext.request;
        var response = scriptContext.response;

        if(request.method === 'GET'){

        var tranId = request.parameters.tranid;
        var entity = request.parameters.entity;
        var total = request.parameters.total;
        var internalId = request.parameters.internalid;
        var financingPrice = request.parameters.custbody_sdr_financing_price;

        var form = serverWidget.createForm({
            title : 'Sales Order Financing'
        });
        
        var nameFld = form.addField({
            id : 'custpage_sdr_financing_help',
            type : serverWidget.FieldType.HELP,
            label : 'Please assign a price to the financing of this sales order, then click Submit Financing'
        })


        var tranIdField = form.addField({
            id: 'custpage_tranid',
            type: serverWidget.FieldType.TEXT,
            label: 'Order #'
        });
        
        var entityField = form.addField({
            id: 'custpage_entity',
            type: serverWidget.FieldType.TEXT,
            label: 'Customer'
        });
        
        var totalField = form.addField({
            id: 'custpage_total',
            type: serverWidget.FieldType.CURRENCY,
            label: 'Total'
        });
        var financingPriceField = form.addField({
            id: 'custpage_custbody_sdr_financing_price',
            type: serverWidget.FieldType.CURRENCY,
            label: 'Financing Price'
        });
        var internalIdField = form.addField({
            id: 'custpage_internalid',
            type: serverWidget.FieldType.TEXT,
            label: 'Internal ID'
        });
        
        tranIdField.defaultValue = tranId;

        tranIdField.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE
        });


        entityField.defaultValue = entity;

        entityField.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE
        });



        totalField.defaultValue = total;

        totalField.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE
        });



        if (financingPrice) {
        financingPriceField.defaultValue = financingPrice;
        }

        if (financingPrice) {
        financingPriceField.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.NORMAL
        });
        }



        internalIdField.defaultValue = internalId;
        internalIdField.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.HIDDEN
        });


            
            
            
            form.addSubmitButton();
            
            response.writePage(form)
            
        } else {
                 internalId =       request.parameters.custpage_internalid
                 financingPrice =  request.parameters.custpage_custbody_sdr_financing_price

            var salesOrderRecord = record.load({
                type: record.Type.SALES_ORDER,
                id: internalId,
                isDynamic: true
            });


            salesOrderRecord.setValue({
                fieldId: 'custbody_sdr_financing_price',
                value: financingPrice
            });

            
            var salesOrderId = salesOrderRecord.save();

            redirect.toRecord({
                type: record.Type.SALES_ORDER,
                id: salesOrderId
            });
        }
       
    }
     
      return{
       onRequest:onRequest
      }  


 });