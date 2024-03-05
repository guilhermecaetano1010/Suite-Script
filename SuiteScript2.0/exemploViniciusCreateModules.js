/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(["N/record"],

    (record) => {
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

            if (scriptContext.type == scriptContext.UserEventType.CREATE) {

                let title = "Validar o cadastro da empresa: "
                let companyName = newRecord.getValue({ fieldId: "companyname" });
                let repSales = newRecord.getValue({ fieldId: "salesrep" });

                let customerId = newRecord.id // currentRecord.id

                let taskTitle = title + companyName

                let task = record.create({ type: record.Type.TASK, isDynamic: true });

                task.setValue({ fieldId: "title", value: taskTitle });

                if (repSales) {
                    task.setValue({ fieldId: "assigned", value: repSales });
                    task.setText({ fieldId: "sendemail", text: "T" });
                }

                task.setValue({ fieldId: "company", value: customerId });

                task.save()

            }





        }

        return { afterSubmit }

    });