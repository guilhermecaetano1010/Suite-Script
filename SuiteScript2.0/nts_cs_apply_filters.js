/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/currentRecord", "N/url"],


    function (currentRecord, url) {


        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

        }

        function applyFilters() {
            let form = currentRecord.get();
            let employee = form.getValue({ fieldId: "custpage_employee" })

            let params = {
                employee: employee
            }
            const serverScript = JSON.parse(form.getValue({ fieldId: "server_script" }))
            window.onbeforeunload = function() {  }
            window.location.replace(url.resolveScript({
                scriptId: serverScript.id,
                deploymentId: serverScript.deploymentId,
                params: params               

            }));

        }
        


        return {
            pageInit: pageInit,
            applyFilters: applyFilters
        };

    });

