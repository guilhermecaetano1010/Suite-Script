/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/task'],
    /**
 * @param{task} task
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
            const newRecord = scriptContext.newRecord
            let customerId = newRecord.id;


            var mrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
                scriptId: "customscript_hbl_map_reduce_task",
                deploymentId: "customdeploy_hbl_map_reduce_task",
                params: {
                    "custscript_hbl_customerid_parameter": customerId
                }
            });

            mrTask.submit()

        }

        return { afterSubmit }

    });