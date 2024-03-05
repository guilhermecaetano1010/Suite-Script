/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/task'],
/**
 * 
 * @param {task} task 
 */
    (task) => {
  
        
        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
        */
       const afterSubmit = (scriptContext) => {
        
            const newRecord = scriptContext.newRecord;

            var customerId = newRecord.id;


            var mrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
                scriptId: 'customscript_sdr_mr_payment_report',
                deploymentId: 'customdeploy_sdr_mr_payment_report',
                params: {
                 'custscript_sdr_mr_customer_parameter': customerId
                }
            });

            mrTask.submit();

        }




        return { afterSubmit }

    });