/**
 * @NScriptType WorkFlowActionScript
 * @NApiVersion 2.0
 */

define(['N/record', 'N/runtime'],
/**
 * @param {record} record
 * @param {runtime} runtime 
 */

function (record, runtime) {

    /**
     * Definition of the Suitlet script trigger point.
     * 
     * @param {Object} scriptContext
     * @param {Object} scriptContext.newRecord - New record
     * @param {Object} scriptContext.oldRecord - Old record
     * @Since 2016.1
     */

    function onAction(scriptContext){
        var orderDate = runtime.getCurrentScript().getParameter({
            name: 'custscript_sdr_order_date'
        });

        var salesOrder = scriptContext.newRecord;
        var itemCount = salesOrder.getLineCount({sublistId : 'item'});


        var notes = 'Last Order Date: ' + orderDate + '\n' + 'Unique items ordered: ' + itemCount;

        var customerId = salesOrder.getValue({fieldId: 'entity'});

        var customerRecord = record.load({
            type : record.Type.CUSTOMER,
            id : customerId,
            isDynamic : true
        });

        customerRecord.setValue({
            fieldId : 'comments',
            value : notes
        })

        update = customerRecord.save()

        if(!update){
            return 'FAILED';
        } 

         return 'SUCCESS';
       
    }
    
    
      return{
        onAction : onAction
      }  


 });