/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([],
    
    () => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
            const newRecord = scriptContext.newRecord
            let form = scriptContext.form

            if(scriptContext.type == scriptContext.UserEventType.CREATE)
            return

            let statusPedido = newRecord.getValue({
                fieldId: 'custrecord_nts_custom_order_status'
            })

            if(statusPedido == 2){
                form.addButton({
                    id: 'custpage_button_aprovar',
                    label: 'Aprovar',
                    functionName: 'aprovar'
                })
                form.addButton({
                    id: 'custpage_button_reprovar',
                    label: 'Reprovar',
                    functionName: 'reprovar'
                })

                form.clientScriptModulePath = 'SuiteScripts/nts_cs_flow_pre_purchase.js'
                
            }
        }
  

        return {beforeLoad}
  
    });