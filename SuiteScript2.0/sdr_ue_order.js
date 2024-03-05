/**
 * @NScriptType UserEventScript
 * @NApiVersion 2.0
 */

define(['N/redirect'],

    function (redirect) {

        /**
         * Definição dos pontos de acionamento do script de evento de usuário.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - Novo registro
         * @param {Record} scriptContext.oldRecord - Registro antigo
         * @since 2016.1
         */

        function afterSubmit(scriptContext) {
            
            var orderNumber = scriptContext.newRecord.getValue({fieldId: 'tranid'});

            var internalId = scriptContext.newRecord.id;

            var clientName = scriptContext.newRecord.getText({fieldId: 'entity'});

            var totalValue = scriptContext.newRecord.getValue({fieldId: 'total'});

            var financingPrice = scriptContext.newRecord.getValue({fieldId: 'custbody_sdr_financing_price'})


     
            var parametrosSuitelet = {
                scriptId    : 'customscript_sdr_sl_salesorder_finance',
                deploymentId: 'customdeploy_sdr_sl_salesorder_finance',
                parameters: {
                    'tranid'                       : orderNumber,
                    'internalid'                    : internalId, 
                    'entity'                       : clientName,
                    'total'                        : totalValue,
                    'custbody_sdr_financing_price' : financingPrice
                }
            };

       
       
            redirect.toSuitelet(parametrosSuitelet);

        }

        return {
            afterSubmit: afterSubmit
        };
    }
);