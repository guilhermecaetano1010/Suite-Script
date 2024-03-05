/**
 * @NScriptType Suitelet
 * @NApiVersion 2.1
 */

define(["N/ui/serverWidget", "N/search", "N/runtime", "N/log"],

  (serverWidget, search, runtime) => {

    /**
     * Definition of the Suitlet script trigger point.
     * 
     * @param {Object} scriptContext
     * @param {ServerRequest} scriptContext.request - Incoming request
     * @param {ServerResponse} scriptContext.response - Suitelet response
     * @Since 2016.1
     */

    const onRequest = (scriptContext) => {
        let parameters = scriptContext.request.parameters
        if(scriptContext.request.method == 'GET'){ // Sempre quando carrega a página
            
            let form = serverWidget.createForm({ title: "Commission"});

            let idEmployee = parameters.employee

            let fieldGroup = form.addFieldGroup({
                id: 'filter',
                label: 'Filters'
            });

            let transactionNumber = form.addField({
                id: 'custpage_transaction_number',
                type: serverWidget.FieldType.INTEGER,
                label: "Transaction Number",
                container: "filter"
            });
            transactionNumber.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            });


            let employee = form.addField({
                id: 'custpage_employee',
                type: serverWidget.FieldType.SELECT,
                label: "Employee",
                source: "employee",
                container: "filter"
            });


            let supervisor = form.addField({
                id: 'custpage_supervisor',
                type: serverWidget.FieldType.SELECT,
                label: "Supervisor Approval",
                source: "employee",
                container: "filter",
            });
            supervisor.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.DISABLED
            });


            let account = form.addField({
                id: 'custpage_account',
                type: serverWidget.FieldType.SELECT,
                label: "Account",
                source: "customlist_nts_list_authorize_lia",
                container: "filter"
            });


            let expense = form.addField({
                id: 'custpage_expense_account',
                type: serverWidget.FieldType.SELECT,
                label: "Expense Account",
                source: "customlist_nts_list_authorize_expense",
                container: "filter"
            });


            let dateEligible = form.addField({
                id: 'custpage_date_eligible',
                type: serverWidget.FieldType.DATE,
                label: "Date Eligible",
                container: "filter"
            });


            let date = form.addField({
                id: 'custpage_date',
                type: serverWidget.FieldType.DATE,
                label: "Date",
                container: "filter"
            });


            let posting = form.addField({
                id: 'custpage_posting_period',
                type: serverWidget.FieldType.SELECT,
                label: "Posting Period",
                source: 'accountingperiod',
                container: "filter"
            });
            posting.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.DISABLED
            });


            let amount = form.addField({
                id: 'custpage_amount',
                type: serverWidget.FieldType.CURRENCY,
                label: "Amount (Foreign Currency)",
                container: "filter"
            });
            amount.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            });

            
            let memo = form.addField({
                id: 'custpage_memo',
                type: serverWidget.FieldType.TEXTAREA,
                label: "Memo",
                container: "filter"                
            })

            let commissionField = form.addField({
                id: 'custpage_commission_field',
                type: serverWidget.FieldType.INTEGER,
                label: "Commission #",
                container: "filter"                
            })
            commissionField.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            }); 


            let subsidiary = form.addField({
                id: 'custpage_subsidiary',
                type: serverWidget.FieldType.SELECT,
                label: "Subsidiary",
                source: "subsidiary",
                container: "filter"
            });
            subsidiary.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            });


            let currency = form.addField({
                id: 'custpage_currency',
                type: serverWidget.FieldType.SELECT,
                label: "Currency",
                source: "currency",
                container: "filter"
            });
            currency.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            });


            let department = form.addField({
                id: 'custpage_department',
                type: serverWidget.FieldType.SELECT,
                label: "Department",
                source: "department",
                container: "filter"
            });


            let location = form.addField({
                id: 'custpage_location',
                type: serverWidget.FieldType.SELECT,
                label: "Location",
                source: "location",
                container: "filter"
            });


            let costCenter = form.addField({
                id: 'custpage_cost_center',
                type: serverWidget.FieldType.SELECT,
                label: "Cost Center",
                source: "class",
                container: "filter"
            });



            
       

        let commissionSublist = form.addSublist({
            id: "sublist",
            type: serverWidget.SublistType.LIST,
            label: "Commissions"
        })

        
        let select = commissionSublist.addField({
            id:"custpage_select",
            type: serverWidget.FieldType.CHECKBOX,
            label: "Select",
        })
        let dateList = commissionSublist.addField({
            id:"custpage_date_list",
            type: serverWidget.FieldType.DATE,
            label: "Date",
        })
        let table = commissionSublist.addField({
            id:"custpage_table",
            type: serverWidget.FieldType.SELECT,
            label: "Schedule",
            source: "customrecord_nts_record_commission_table"
        })
        let transaction = commissionSublist.addField({
            id:"custpage_transaction",
            type: serverWidget.FieldType.SELECT,
            label: "Transaction",
            source: "transaction"
        })
        let customer = commissionSublist.addField({
            id:"custpage_customer",
            type: serverWidget.FieldType.SELECT,
            label: "Customer",
            source: "customer"
        })
        let dateEligibleList = commissionSublist.addField({
            id: 'custpage_date_eligible_list',
            type: serverWidget.FieldType.DATE,
            label: "Date Eligible"
        })
        let type = commissionSublist.addField({
            id:"custpage_type",
            type: serverWidget.FieldType.TEXT,
            label: "Type",
        })
        let currencyList = commissionSublist.addField({
            id:"custpage_currency_list",
            type: serverWidget.FieldType.CURRENCY,
            label: "Currency",
        })
        let basis = commissionSublist.addField({
            id:"custpage_basis",
            type: serverWidget.FieldType.CURRENCY,
            label: "Basis",
        })
        let calculated = commissionSublist.addField({
            id:"custpage_calculated",
            type: serverWidget.FieldType.CURRENCY,
            label: "Calculated Commission"
        })
        let previously = commissionSublist.addField({
            id:"custpage_previously",
            type: serverWidget.FieldType.CURRENCY,
            label: "Previously Authorized"
        })
        let eligible = commissionSublist.addField({
            id:"custpage_eligible",
            type: serverWidget.FieldType.CURRENCY,
            label: "Eligible Amount"
        })
        let amountList = commissionSublist.addField({
            id:"custpage_amount_list",
            type: serverWidget.FieldType.CURRENCY,
            label: "Amount"
        })
        let exchangeRate = commissionSublist.addField({
            id:"custpage_exchange_rate",
            type: serverWidget.FieldType.CURRENCY,
            label: "Exchange Rate"
        })
        let foreign = commissionSublist.addField({
            id:"custpage_foreign",
            type: serverWidget.FieldType.CURRENCY,
            label: "Amount (Foreign Currency)"
        })

        if(idEmployee) {
            employee.defaultValue = idEmployee
            let commissions = _searchCommissions(idEmployee)              
            // log.debug({
            //     title : 'TESTE 1',
            //     details : commissions
            // })
            let i = 0;
            commissions.forEach(function (result) {
                let dateSearch = result.dateS
                let table = result.scheduleS;
                let transaction = result.transactionS;
                let customer = result.customerS;
                let dateEligibleSearch = result.dateEligibleS;
                let type = result.typeS;
                let currency = result.currencyS;
                let basis = result.basisS;
                let calculated = result.calculatedS;
                let previously = result.previouslyS;
                let eligible = result.eligibleS;
                let amountSearch = result.amountS;
                let exchangeRate = result.exchangeRateS;
                let foreign = result.foreignS;               


                
                let transactionRecord = parseInt(result.id)
                let supervisorRecord = result.supervisorS
                let accountRecord = result.accountS
                let expenseRecord = result.expenseS
                let dateEligibleRecord = new Date(result.eligibleRecordS)
                let dateRecord = new Date(result.dateRecordS)
                let postingRecord = result.postingS
                // let amountRecord = result.amountRecordS
                let memoRecord = result.memoS
                let idCommission = parseInt(result.commissionS)
                let subsidiaryRecord = result.subsidiaryS
                let currencyRecord = result.currencyRecordS
                let departmentRecord = result.departmentS
                let locationRecord = result.locationS
                let cost = result.costCenterS

                
                // transactionNumber.defaultValue = transactionRecord
                supervisor.defaultValue = supervisorRecord
                account.defaultValue = accountRecord
                expense.defaultValue = expenseRecord
                dateEligible.defaultValue = dateEligibleRecord
                date.defaultValue = dateRecord
                posting.defaultValue = postingRecord
                memo.defaultValue = memoRecord
                // commissionField.defaultValue = idCommission
                subsidiary.defaultValue = subsidiaryRecord
                currency.defaultValue = currencyRecord
                department.defaultValue = departmentRecord
                location.defaultValue = locationRecord
                costCenter.defaultValue = cost
   
                if (select.isChecked) {
                    amount.defaultValue = amountSearch     
                } else { 
                    amount.defaultValue = 0 /*amountRecord*/
                }
                
                
                // log.debug({
                //     title : 'TESTE 1',
                //     details : idCommission+ ' ' + table
                // })
                commissionSublist.setSublistValue({id : "custpage_date_list", value: dateSearch, line: i})
                commissionSublist.setSublistValue({id : "custpage_table", value: table, line: i})
                commissionSublist.setSublistValue({id : "custpage_transaction", value: transaction, line: i})
                commissionSublist.setSublistValue({id : "custpage_customer", value: customer, line: i})
                commissionSublist.setSublistValue({id : "custpage_date_eligible_list", value: dateEligibleSearch, line: i})
                commissionSublist.setSublistValue({id : "custpage_type", value: type, line: i})
                commissionSublist.setSublistValue({id : "custpage_currency_list", value: currency, line: i})
                commissionSublist.setSublistValue({id : "custpage_basis", value: basis, line: i})
                commissionSublist.setSublistValue({id : "custpage_calculated", value: calculated, line: i})
                commissionSublist.setSublistValue({id : "custpage_previously", value: previously, line: i})
                commissionSublist.setSublistValue({id : "custpage_eligible", value: eligible, line: i})
                commissionSublist.setSublistValue({id : "custpage_amount_list", value: amountSearch, line: i})
                commissionSublist.setSublistValue({id : "custpage_exchange_rate", value: exchangeRate, line: i})
                commissionSublist.setSublistValue({id : "custpage_foreign", value: foreign, line: i})
                i++
            })
        }
            // commissionSublist.setSublistValue({id: "custpage_table", line: 0, value: 1})



            form.addSubmitButton();

            form.addField({
                id: "server_script",
                type: serverWidget.FieldType.LONGTEXT,
                label: "Server Script"
            })
                .updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
                .defaultValue = JSON.stringify(runtime.getCurrentScript()) 

            form.addButton({
                id: "commissionSearch",
                label: "Apply filters",
                functionName: "applyFilters"
            })

             form.clientScriptModulePath = "SuiteScripts/nts_cs_apply_filters.js"

             form.addButton({
                id: "cancel",
                label: "Cancel"
             })

             scriptContext.response.writePage(form);
        } else { // POST quando clicamos em submit

        }
       
    }


    function _searchCommissions(employee) {
        let results = []
        search.create({
            type: "customrecord_nts_record_commission_all",
            filters: [
                search.createFilter({ name: 'custrecord_nts_field_comall_employee', operator: search.Operator.IS, values: employee
            })
            ],
            columns: [
                search.createColumn({ name: 'internalid' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_supervisor' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_account' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_expense' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_eligible' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_date' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_posting' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_amount' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_memo' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_commission' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_subsidiary' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_currency' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_department' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_location' }),
                search.createColumn({ name: 'custrecord_nts_field_comall_cost_center' })
            ]
        }).run().getRange({ start: 0, end: 100 }).forEach(function (result) {
         let id =  result.getValue('internalid')   
         let supervisor =  result.getValue('custrecord_nts_field_comall_supervisor')   
         let account =  result.getValue('custrecord_nts_field_comall_account')   
         let expense =  result.getValue('custrecord_nts_field_comall_expense')   
         let dateEligibleRecord =  result.getValue('custrecord_nts_field_comall_eligible')   
         let dateRecord =  result.getValue('custrecord_nts_field_comall_date')   
         let posting =  result.getValue('custrecord_nts_field_comall_posting')   
         let amountRecord =  result.getValue('custrecord_nts_field_comall_amount')   
         let memo =  result.getValue('custrecord_nts_field_comall_memo')   
         let commission =  result.getValue('custrecord_nts_field_comall_commission')   
         let subsidiary =  result.getValue('custrecord_nts_field_comall_subsidiary')   
         let currencyRecord =  result.getValue('custrecord_nts_field_comall_currency')   
         let department =  result.getValue('custrecord_nts_field_comall_department')   
         let location =  result.getValue('custrecord_nts_field_comall_location')   
         let costCenter =  result.getValue('custrecord_nts_field_comall_cost_center')   

        if (id){

        }
        search.create({
            type: "customrecord_nts_subrec_commission",
            filters: [
                search.createFilter({ name: 'custrecord_nts_field_commission_link', operator: search.Operator.IS, values: id
            })
            ],
            columns: [
                search.createColumn({ name: 'custrecord_nts_field_obli_data' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_schedule' }),
                search.createColumn({ name: 'custrecord_nts_field_invoice_link' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_customer' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_date_eligible' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_type' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_currency' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_basis' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_calculated' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_previously' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_eligible' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_amount' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_exchange' }),
                search.createColumn({ name: 'custrecord_nts_field_obli_am_foreign' }),
            ]
        }).run().getRange({ start: 0, end: 100 }).forEach(function (result) {
                let date = result.getValue('custrecord_nts_field_obli_data')
                let schedule = result.getValue('custrecord_nts_field_obli_schedule')
                let transaction = result.getValue('custrecord_nts_field_invoice_link')
                let customer = result.getValue('custrecord_nts_field_obli_customer')
                let dateEligible = result.getValue('custrecord_nts_field_obli_date_eligible')
                let type = result.getValue('custrecord_nts_field_obli_type')
                let currency = result.getValue('custrecord_nts_field_obli_currency')
                let basis = result.getValue('custrecord_nts_field_obli_basis')
                let calculated = result.getValue('custrecord_nts_field_obli_calculated')
                let previously = result.getValue('custrecord_nts_field_obli_previously')
                let eligible = result.getValue('custrecord_nts_field_obli_eligible')
                let amount = result.getValue('custrecord_nts_field_obli_amount')
                let exchangeRate = result.getValue('custrecord_nts_field_obli_exchange')
                let foreign = result.getValue('custrecord_nts_field_obli_am_foreign')
                let json = {
                    id: id,
                    supervisorS: supervisor,
                    accountS: account,
                    expenseS: expense,
                    eligibleRecordS: dateEligibleRecord,
                    dateRecordS: dateRecord,
                    postingS: posting,
                    amountRecordS: amountRecord,
                    memoS: memo,
                    commissionS: commission,
                    subsidiaryS: subsidiary,
                    currencyRecordS: currencyRecord,
                    departmentS: department,
                    locationS: location,
                    costCenterS: costCenter, 
                    dateS: date,
                    scheduleS: schedule,
                    transactionS: transaction,
                    customerS: customer,
                    dateEligibleS: dateEligible,
                    typeS: type,
                    currencyS: currency,
                    basisS: basis,
                    calculatedS: calculated,
                    previouslyS: previously,
                    eligibleS: eligible,
                    amountS: amount,
                    exchangeRateS: exchangeRate,
                    foreignS: foreign
                }
        
                results.push(json)
        });         
        })
     return results  
    }


     
      return{onRequest}  


 });