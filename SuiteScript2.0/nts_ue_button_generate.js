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

            if (scriptContext.type == scriptContext.UserEventType.CREATE)
                return

            form.addButton({
                id: 'custpage_create_products_purchase',
                label: 'Create Products & Purchase',
                functionName: 'createProductsPurchase'
            })

            let loadScreen = form.addField({
                type: 'inlinehtml',
                id: 'custpage_nts_load_screen',
                label: 'Load Screen'
            })

            loadScreen.defaultValue = '<div id="loadscreen" style="display:flex; justify-content: center; align-items: center; flex-direction: row; flex-wrap: wrap; position: fixed; height: 100%; width: 100%; z-index: 1000; background: rgba(240, 240, 240, 0.8); top: 0; left: 0; visibility: hidden; font-size: 30px; text-transform: uppercase; font-weight: 700;"><p style="margin-bottom: 150px; color: #C0392B;">Aguarde um momento enquanto processamos a requisição.</p><br><div style="margin-top: 100px; position: fixed; border: 16px solid #F3F3F3; border-radius: 50%;border-top: 16px solid #E06666;width: 100px;height: 100px; -webkit-animation: spin 1s linear infinite;animation: spin 1s linear infinite;"></div></div>'

            //#3498DB animação
            form.clientScriptModulePath = 'SuiteScripts/nts_create_purchase_item.js'

        }


        return { beforeLoad }

    });