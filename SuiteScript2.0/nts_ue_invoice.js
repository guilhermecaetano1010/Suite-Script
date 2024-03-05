/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/search', 'N/log', 'N/record'],

    (search, log , record) => {
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
            
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
        */
        const beforeSubmit = (scriptContext) => {
        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
        */
       const afterSubmit = (scriptContext) => {

            let newRecord = scriptContext.newRecord;
            let salesRepId = newRecord.getValue('salesrep')
            let date = newRecord.getValue('trandate')
            let newDate = new Date(date)
            let postingPeriod = newRecord.getValue('postingperiod')
            let subTotal = newRecord.getValue('subtotal')
            let location = newRecord.getValue('location')
            let transaction = newRecord.id
            let customer = newRecord.getValue('entity')

            if(scriptContext.type !== scriptContext.UserEventType.CREATE)
            return

            if (salesRepId) {

                search.create({
                    type: "customrecord_nts_record_assign_plan",
                    filters: [
                        search.createFilter({ name: 'custrecord_nts_field_assign_sales_rep', operator: search.Operator.IS, values: salesRepId })
                    ],
                    columns: [
                        search.createColumn({ name: 'internalid' }),
                        search.createColumn({ name: 'custrecord_nts_field_assign_plan' }),
                        search.createColumn({ name: 'custrecord_nts_field_assign_sales_rep' }),
                    ]
                }).run().getRange({ start: 0, end: 100 }).forEach(function (result) {
                    let intenalId = result.getValue('internalid')
                    let assignPlanId = result.getValue('custrecord_nts_field_assign_plan')
                    let salesRepName = result.getText('custrecord_nts_field_assign_sales_rep')

                    log.debug({
                        title : 'TESTE 1',
                        details : 'Teste 1' + ' '+ intenalId+ ' ' + assignPlanId + ' ' + salesRepName
                    })

                    if (assignPlanId) {
                        search.create({
                            type: "customrecord_nts_record_schedules_plan",
                            filters: [
                                search.createFilter({ name: 'custrecord_nts_field_schedules_plan', operator: search.Operator.IS, values: assignPlanId })
                            ],
                            columns: [
                                search.createColumn({ name: 'custrecord_nts_field_schedule' }),
                            ]
                        }).run().getRange({ start: 0, end: 100 }).forEach(function (result) {
                            let schedulePlanId = result.getValue('custrecord_nts_field_schedule')
                            log.debug({
                                title : 'TESTE 2',
                                details : 'Teste 2' + schedulePlanId
                            })
                            if (schedulePlanId) {
                                search.create({
                                    type: "customrecord_nts_record_commission_table",
                                    filters: [
                                        search.createFilter({ name: 'internalid', operator: search.Operator.IS, values: schedulePlanId })
                                    ],
                                    columns: [
                                        search.createColumn({ name: 'custrecord_nts_field_commission_percent' }),
                                        search.createColumn({ name: 'custrecord_nts_field_commission_on' }),
                                        search.createColumn({ name: 'custrecord_nts_field_eligible_value' }),
                                        search.createColumn({ name: 'custrecord_nts_field_commission_company' }),
                                        search.createColumn({ name: 'custrecord_nts_field_commission_currency' }),
                                        search.createColumn({ name: 'custrecord_nts_field_commission_currency' }),
                                    ]
                                }).run().getRange({ start: 0, end: 100 }).forEach(function (result) {
                                    let percentage = result.getValue('custrecord_nts_field_commission_percent')
                                    let typeCommission = result.getText('custrecord_nts_field_commission_on')
                                    let eligibleValue = result.getValue('custrecord_nts_field_eligible_value')
                                    let subsidiary = result.getValue('custrecord_nts_field_commission_company')
                                    let currency = result.getText('custrecord_nts_field_commission_currency')
                                    let currencyValue = result.getValue('custrecord_nts_field_commission_currency')
                                    log.debug({
                                        title : 'TESTE 3',
                                        details : 'Teste 3' + ' ' + percentage + ' ' + typeCommission + ' ' + eligibleValue
                                    })                                    
                                    if (percentage && typeCommission && eligibleValue) {
                                        search.create({
                                            type: search.Type.EMPLOYEE,
                                            filters: [
                                                search.createFilter({ name: 'internalid', operator: search.Operator.IS, values: salesRepId })
                                            ],
                                            columns: [
                                                search.createColumn({ name: 'supervisor'}),
                                                search.createColumn({ name: 'department'}),
                                            ]
                                        }).run().getRange({ start: 0, end: 100 }).forEach(function (result) {
                                            let supervisor = result.getValue('supervisor')
                                            let department = result.getValue('department')

                                            
                                            let commission = record.create({
                                            type: 'customrecord_nts_record_commission_all',
                                            isDynamic: true
                                        })
                                        let numberPercent = parseFloat(percentage)
                                        let amount = numberPercent / 100 * subTotal

                                        // commission.setValue({ fieldId: 'custrecord_nts_field_comall_employee', value: salesRepId })
                                        commission.setText({ fieldId: 'altname', text: salesRepName})
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_employee', value: salesRepId})
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_supervisor', value: supervisor})
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_account', value: 1 })
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_expense', value: 2 })
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_eligible', value: newDate })
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_date', value: newDate })
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_posting', value: postingPeriod })
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_amount', value: amount })
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_subsidiary', value: subsidiary })
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_currency', value: currencyValue })
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_department', value: department })
                                        commission.setValue({ fieldId: 'custrecord_nts_field_comall_location', value: location })
                                        
                                        commission.selectNewLine({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId : 'recmachcustrecord_nts_field_commission_link',
                                            fieldId : 'custrecord_nts_field_invoice_link',
                                            value : transaction
                                        })
                                        
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_data',
                                            value: newDate
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_schedule',
                                            value: schedulePlanId
                                        });

                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_customer',
                                            value: customer
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_date_eligible',
                                            value: newDate
                                        });
                                        commission.setCurrentSublistText({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_type',
                                            text: typeCommission
                                        });
                                        commission.setCurrentSublistText({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_currency',
                                            text: currency
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_basis',
                                            value: subTotal
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_calculated',
                                            value: amount
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_previously',
                                            value: amount
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_eligible',
                                            value: amount
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_amount',
                                            value: amount
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_exchange',
                                            value: '1'
                                        });
                                        commission.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link',
                                            fieldId: 'custrecord_nts_field_obli_am_foreign',
                                            value: amount
                                        });
                                        
                                        commission.commitLine({
                                            sublistId: 'recmachcustrecord_nts_field_commission_link'
                                        })
                                        
                                        commission.save()
                                    })
                                  }
                                })
                            }
                        })
                    }
                })

            }
                        
    
        //     Trouxe automático e esse script precisava ser arrumado
        //     
        //     search.create({
        //         type: "customrecord_nts_subrec_commission",
        //         filters: [
        //             search.createFilter({ name: 'custrecord_nts_field_invoice_link', operator: search.Operator.IS, values: transaction})
        //         ],
        //         columns: [
        //             search.createColumn({ name: 'custrecord_nts_field_obli_data' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_schedule' }),
        //             search.createColumn({ name: 'custrecord_nts_field_invoice_link' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_customer' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_date_eligible' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_type' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_currency' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_basis' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_calculated' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_previously' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_eligible' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_amount' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_exchange' }),
        //             search.createColumn({ name: 'custrecord_nts_field_obli_am_foreign' }),
        //         ]
        //     }).run().getRange({ start: 0, end: 1 }).forEach(function (result) {
        //            let date = result.getValue('custrecord_nts_field_obli_data')
        //            let schedule = result.getValue('custrecord_nts_field_obli_schedule')
        //            let transactionField = result.getValue('custrecord_nts_field_invoice_link')
        //            let customer = result.getValue('custrecord_nts_field_obli_customer')
        //            let dateEligible = result.getValue('custrecord_nts_field_obli_date_eligible')
        //            let onType = result.getValue('custrecord_nts_field_obli_type')
        //            let currency = result.getValue('custrecord_nts_field_obli_currency')
        //            let basis = result.getValue('custrecord_nts_field_obli_basis')
        //            let calculated = result.getValue('custrecord_nts_field_obli_calculated')
        //            let previously = result.getValue('custrecord_nts_field_obli_previously')
        //            let eligible = result.getValue('custrecord_nts_field_obli_eligible')
        //            let amount = result.getValue('custrecord_nts_field_obli_amount')
        //            let exchange = result.getValue('custrecord_nts_field_obli_exchange')
        //            let foreign = result.getValue('custrecord_nts_field_obli_am_foreign')
                   
        //         if(transactionField == transaction){
     
                    
        //         let commissionTran = record.create({
        //                 type: 'customrecord_nts_record_commission_all',
        //                 isDynamic: true
        //         })
        //         commissionTran.selectNewLine({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //         });
                
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_data',
        //             value: date
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_schedule',
        //             value: schedule
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_invoice_link',
        //             value: transactionField
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_customer',
        //             value: customer
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_date_eligible',
        //             value: dateEligible
        //         });
        //         commissionTran.setCurrentSublistText({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_type',
        //             text: onType
        //         });
        //         commissionTran.setCurrentSublistText({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_currency',
        //             text: currency
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_basis',
        //             value: basis
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_calculated',
        //             value: calculated
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_previously',
        //             value: previously
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_eligible',
        //             value: eligible
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_amount',
        //             value: amount
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_exchange',
        //             value: exchange
        //         });
        //         commissionTran.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link',
        //             fieldId: 'custrecord_nts_field_obli_am_foreign',
        //             value: foreign
        //         });
                
        //         commissionTran.commitLine({
        //             sublistId: 'recmachcustrecord_nts_field_invoice_link'
        //         })
                
        //         commissionTran.save()
        //     }
        // })
    }

        return { /*beforeLoad,   beforeSubmit,*/ afterSubmit}

    });