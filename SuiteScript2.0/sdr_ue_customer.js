/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record','N/email', 'N/runtime', 'N/error'],
    
  (record, email,runtime, error) => {
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
       * @param {error} error
       * @since 2015.2
       */
      const beforeSubmit = (scriptContext) => {

        var customer = scriptContext.newRecord;


        if(scriptContext.type == scriptContext.UserEventType.CREATE){
          var salesRep = customer.getValue('salesrep')

          if (!salesRep) {
            var salesRepError = error.create({
              name: 'SALES_REP_EMPTY',
              message: 'Save failed. Please make sure that the Sales Rep field is not empty.',
              notifyOff : false
            })
            log.error('Error: ' + salesRepError.name , salesRepError.message);
            throw salesRepError;
          } 
        }
      }

      /**
       * Defines the function definition that is executed after record is submitted.
       * @param {Object} scriptContext
       * @param {Record} scriptContext.newRecord - New record
       * @param {Record} scriptContext.oldRecord - Old record
       * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
       * @param {runtime} runtime
       * @param {email} email
       * @since 2015.2
       */
      const afterSubmit = (scriptContext) => {
           // log.debug('Hello World');
   
   var customer = scriptContext.newRecord;
   
  //  var customerId = customer.getValue('entityid');
  var customerId = customer.id;
   var customerEmail = customer.getValue('email');
   var salesRepName = customer.getValue('salesrep')
   var couponCode = customer.getValue('custentity_sdr_coupon_code')
   
   log.debug('Customer ID', customerId);
   log.debug('Customer Email',customerEmail);
   log.debug('Sales Rep Name', salesRepName);
   log.debug('Coupon Code', couponCode);
   

   if(scriptContext.type == scriptContext.UserEventType.CREATE){
    var user = runtime.getCurrentUser();
   var task = record.create({
       type: record.Type.TASK,
       isDynamic: true,
       defaultValues: {
         customform: -120
       }
     });

     email.send({
      author: user.id,
      recipients: customerId,
      subject: 'Welcome to SuiteDreams!',
      body: 'Welcome! We are glad for you to be a customer of SuiteDreams',
    });

    log.debug('Role:', user.id);

   task.setValue('title', 'TEST create a task and send a email');
   task.setValue('priority', 'HIGH');
   task.save();
   

   var companyName = customer.getValue('companyname')
   var event = record.create({
    type: record.Type.CALENDAR_EVENT,
    isDynamic: true
  });

  event.setValue('title', 'Welcome conversation with ' + companyName);
  event.setValue({fieldId: 'sendemail', value: true});
  event.setValue({fieldId: 'company', value: customer.id});

  event.selectNewLine({ sublistId : 'attendee'});

  event.setCurrentSublistValue({ sublistId:'attendee', fieldId:'attendee', value: customer.id});

  event.commitLine({sublistId: 'attendee'});


  event.selectNewLine({ sublistId: 'attendee'});

  event.setCurrentSublistValue({ sublistId:'attendee', fieldId: 'attendee', value: customer.getValue('salesrep')});

  event.commitLine({ sublistId: 'attendee' });


  event.save();
}
}
 


      return{beforeSubmit, afterSubmit}

  });