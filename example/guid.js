import { ready, errorMessage } from './support';

// polyfills
import 'babel-polyfill';
import 'indexeddbshim';
import 'mutationobserver-shim';
import 'object.observe';
import 'array.observe';

import rethink from '../bin/rethink';

// reTHINK modules
// import RuntimeUA from 'runtime-core/dist/runtimeUA';

// import SandboxFactory from '../resources/sandboxes/SandboxFactory';
// let sandboxFactory = new SandboxFactory();
// let avatar = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';

// You can change this at your own domain
let domain = "felix.dev"; // change to your URL!
window.runtime = {
  "domain": domain
}

// Hack because the GraphConnector jsrsasign module;
window.KJUR = {};

// Check if the document is ready
if (document.readyState === 'complete') {
  documentReady();
} else {
  window.addEventListener('onload', documentReady, false);
  document.addEventListener('DOMContentLoaded', documentReady, false);
}

var runtimeLoader;

function documentReady() {
  // ready();
  let hypertyHolder = $('.hyperties');
  hypertyHolder.removeClass('hide');
  window.addEventListener("message", messageHandler, false);

  rethink.install({
    "domain": domain,
    development: true
  }).then(runtimeInstalled).catch(errorMessage);
}

function messageHandler(event){
    if(event.data.to == "runtime:getContact"){
    let userFirstName = event.data.body.firstName;
    let userLastName = event.data.body.lastName;
    $('.testResult').append("<h3>The user's firstName is <u>"+ userFirstName+"<h3></u> and Last Name is <u>"+ userLastName+"</u></h3>");
  }else if(event.data.to =='runtime:checkGUID'){
    let found =event.data.body.check; // true if there ist contacts list associated with the GUID,
    let FoF = event.data.body.usersFoF; 

    console.log('@@@ Recrevived Postmessage' + event.data.to);

    let DirectContact =event.data.usersDirectContact;
    if (event.data.check){  
      console.log('FoF : '+ FoF);
      console.log(' DirectContact : '+ DirectContact);
    }else if(!event.data.check){
      console.log('User with no contacts \n GUID: ' + event.data.body.GUID )
    };

  }else if(event.data.to === 'runtime:getAllContacts'){
    let contactsList = event.data.body.result;
    console.log(contactsList);
  }else if(event.data.to === 'runtime:getGroup'){
    let tempGroup = event.data.body.result;
    console.log(tempGroup);
  }else if(event.data.to === "runtime:getGroupNames"){
    let tempGroupNames = event.data.body.result;
    console.log("Group names of the user " + tempGroupNames)
  }else if( event.data.to ==='runtime:generateGUID'){
    console.log('generateGUID: '+ event.data.body.guid)

  } 

}


function runtimeInstalled(runtime) {
  console.info(runtime);
  window.runtime = {"runtime": runtime};

  $('.getDet').on('click', (e)=>{
    runtime.generateGUID();
    runtime.addUserID('facebook.com/felix');
    runtime.removeUserID('facebook.com/felix');
    runtime.addContact('budc8fucd8cdsc98dc899dc', 'reThinkUser', 'Test');
    runtime.getContact('reThinkUser');
    runtime.checkGUID('budc8fucd8cdsc98dc899dc');
    runtime.removeContact('budc8fucd8cdsc98dc899dc');
    //adding contact again to do further testing
    runtime.addContact('budc8fucd8cdsc98dc899dc', 'reThinkUser', 'Test');
    runtime.checkGUID('budc8fucd8cdsc98dc899dc');
    runtime.useGUID('grey climb demon snap shove fruit grasp hum self grey climb demon snap shove fruit grasp');
    runtime.sendGlobalRegistryRecord("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ");
    runtime.queryGlobalRegistry('budc8fucd8cdsc98dc899dc');
    runtime.calculateBloomFilter1Hop();
    runtime.setBloomFilter1HopContact('budc8fucd8cdsc98dc899dc');
    runtime.signGlobalRegistryRecord();
    runtime.addContact('jdfjhdskfkdshfbdkfkjff989e', 'TestingNew', 'runtime');
    runtime.editContact('jdfjhdskfkdshfbdkfkjff989e', 'TestingNew', 'runtime', 'hfjdsbsjfhdiusfbuidshfcudss87cv7ds8c7d', true);
    runtime.addContact('123456', 'john', 'snow');
    runtime.addContact('1234', 'Joey', 'Landwunder');
    runtime.addGroupName('123456', 'Winterfell');
    runtime.addGroupName('1234', 'Winterfell');
    runtime.getGroup('Winterfell')
    runtime.removeGroupName('123456', 'Winterfell');
    runtime.getAllContacts();
    runtime.setLocation('123456', 'Berlin');
    runtime.removeLocation('123456');
  //let hypertyObserver = 'hyperty-catalogue://' + runtime.domain + '/.well-known/hyperty/HelloWorldObserver';

  // Load First Hyperty
  //runtime.requireHyperty(hypertyObserver).then(hypertyObserverDeployed).catch(function(reason) {
  //  errorMessage(reason);
  //});
  });

  $('#useGUID').on('click', ()=>{
      runtime.useGUID('grey climb demon snap shove fruit grasp hum self grey climb demon snap shove fruit grasp');
  });

  $('#generateGUID').on('click', ()=>{
        runtime.generateGUID();

  });

  $('#addUserID').on('click', ()=>{
    runtime.addUserID('facebook.com/felix');

  });

  $('#removeUserID').on('click', ()=>{
    runtime.removeUserID('facebook.com/felix');

  });

  $('#addContact').on('click', ()=>{
    runtime.addContact('budc8fucd8cdsc98dc899dc', 'reThinkUser', 'Test');
    runtime.addContact('123456', 'john', 'snow');
    runtime.addContact('1234', 'Joey', 'Landwunder');

  });

  $('#removeContact').on('click', ()=>{
    runtime.removeContact('budc8fucd8cdsc98dc899dc');
    runtime.removeContact('123456');
    runtime.removeContact('1234');

  });

  $('#getAllContacts').on('click', ()=>{
     runtime.getAllContacts(); 
  });

  $('#addGroupName').on('click', ()=>{
    runtime.addGroupName('123456', 'Winterfell');
    runtime.addGroupName('1234', 'Winterfell');
    runtime.addGroupName('budc8fucd8cdsc98dc899dc', 'Football');

  });

  $('#getGroup').on('click', ()=>{
    runtime.getGroup('Winterfell')
      

  });
   $('#getGroupNames').on('click', ()=>{
     runtime.getGroupNames('Winterfell');
  
  });
  $('#removeGroupName').on('click', ()=>{
      runtime.removeGroupName('123456', 'Winterfell');

  });

  $('#setLocation').on('click', ()=>{
    runtime.setLocation('budc8fucd8cdsc98dc899dc','Berlin');
     

  });

  $('#removeLocation').on('click', ()=>{
     runtime.removeLocation('budc8fucd8cdsc98dc899dc');
  
  });

  $('#getGroupNames').on('click', ()=>{
     runtime.getGroupNames('Winterfell');
  
  });


}
