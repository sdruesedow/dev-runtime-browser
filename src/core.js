/**
 * Copyright 2016 PT Inovação e Sistemas SA
 * Copyright 2016 INESC-ID
 * Copyright 2016 QUOBIS NETWORKS SL
 * Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
 * Copyright 2016 ORANGE SA
 * Copyright 2016 Deutsche Telekom AG
 * Copyright 2016 Apizee
 * Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
import URI from 'urijs';
import RuntimeFactory from './RuntimeFactory';

function returnHyperty(source, hyperty) {
    source.postMessage({
        to: 'runtime:loadedHyperty',
        body: hyperty
    }, '*')
}

function searchHyperty(runtime, descriptor) {
    let hyperty = undefined;
    let index = 0;
    while (!!hyperty) {
        if (runtime.registry.hypertiesList[index] === descriptor)
            hyperty = runtime.registry.hypertiesList[index]

        index++
    }

    return hyperty;
}

let parameters = new URI(window.location).search(true)
let runtimeURL = parameters.runtime
let development = !!parameters.development
let catalogue = RuntimeFactory.createRuntimeCatalogue(development)

catalogue.getRuntimeDescriptor(runtimeURL)
    .then(function(descriptor) {
        let sourcePackageURL = descriptor.sourcePackageURL;
        if (sourcePackageURL === '/sourcePackage') {
            return descriptor.sourcePackage;
        }

        return catalogue.getSourcePackageFromURL(sourcePackageURL);
    })
    .then(function(sourcePackage) {
        eval.apply(window, [sourcePackage.sourceCode])

        let runtime = new Runtime(RuntimeFactory, window.location.host);
        window.addEventListener('message', function(event) {
            if (event.data.to === 'core:loadHyperty') {
                let descriptor = event.data.body.descriptor;
                let hyperty = searchHyperty(runtime, descriptor);

                if (hyperty) {
                    returnHyperty(event.source, {
                        runtimeHypertyURL: hyperty.hypertyURL
                    });
                } else {
                    runtime.loadHyperty(descriptor)
                        .then(returnHyperty.bind(null, event.source));
                }
            

            }else if(event.data.to === 'graph:getAllContacts'){

                console.log("##Inside core: returning all contacts");
                let contactsList = runtime.graphConnector.getAllContacts();

                if(contactsList){
                    parent.postMessage({to:'runtime:getAllContacts', body:{"result" :contactsList}}, '*');
                }

            }else if(event.data.to === 'graph:removeLocation'){
                let tmpGuid= event.data.body.guid;

                console.log("##Inside core: removing location from the "+ tmpGuid);
                let result=runtime.graphConnector.removeLocation(tmpGuid);
                if(result){
                    console.log('Location successfully removed');
                }else{
                    console.log('Location has not been removed ')
                }
                //parent.postMessage({to:'runtime:removeLocation', body:{"result" :result}}, '*');


            }else if(event.data.to === 'graph:setLocation') {
                let tmpGuid= event.data.body.guid;
                let tmpLoc= event.data.body.locationName;

                console.log("##Inside core: setting location- "+tmpLoc +"  + for: "+ tmpGuid);
                let result = runtime.graphConnector.setLocation(tmpGuid,tmpLoc);
                console.log('User found? - '+result);

               
            }else if (event.data.to === 'graph:getGroup'){  

                let tmpGroup = event.data.body.groupName;
                console.log("##Inside core: getting members of the: "+ tmpGroup)
                let result = runtime.graphConnector.getGroup(tmpGroup);
                parent.postMessage({to:'runtime:getGroup',body:{"result": result}},'*');

            }else if(event.data.to === 'graph:getGroupNames') {

                console.log("##Inside core: getting all group names")
                let result= runtime.graphConnector.getGroupNames();
                if(result.length != 0){
                    for (var i = 0; i < result.length; i++) {
                        console.log(result[i]);
                    };
                } else {
                    console.log("!!!!Error: No group names Yet. Tip: Please add contacts and add group names!!!!")
                }
                parent.postMessage({to:'runtime:getGroupNames',body:{"result": result}},'*');


            }else if(event.data.to === 'graph:addGroupName') {
                let tmpGuid= event.data.body.guid;
                let tmpGroup= event.data.body.groupName;
                // post message 
                console.log("##Inside core: adding a groupName: " + tmpGroup +" to "+tmpGuid);
                let success = runtime.graphConnector.addGroupName(tmpGuid,tmpGroup);
                if(success){
                    console.log("!!!!Added \""+ tmpGroup +"\" successfully to \""+ tmpGuid +"\"!!!!");
                } else {
                    console.log("!!!!Error: Guid \""+ tmpGuid +"\" does not exist or groupName \""+ tmpGroup +"\" already exists");
                }
                parent.postMessage({to:'runtime:addGroupName', body:{"result" :success}}, '*');
            }else if(event.data.to === 'graph:removeGroupName') {
                let tmpGuid= event.data.body.guid;
                let tmpGroup= event.data.body.groupName;
                console.log("##Inside core: Removing a groupName: " + tmpGroup +" to "+tmpGuid);
                let success = runtime.graphConnector.removeGroupName(tmpGuid,tmpGroup);
                if(success){
                    console.log("!!!!Removed \""+ tmpGroup +"\" successfully from \""+ tmpGuid +"\"!!!!");
                } else {
                    console.log("!!!!Error: Guid \""+ tmpGuid +"\" does not exist or groupName \""+ tmpGroup +"\" does not exist");
                }
                parent.postMessage({to:'runtime:removeGroupName', body:{"result" :success}}, '*');
            } else if (event.data.to === 'core:loadStub') {
                runtime.loadStub(event.data.body.domain)
            } else if (event.data.to === 'graph:generateGUID') {
                console.log('##try generating GUID');
                let userGUID = runtime.graphConnector.generateGUID();
                if (userGUID != null) {
                    parent.postMessage({to:'runtime:generateGUID', body:{"guid" : userGUID, }}, '*');
                    console.log('## GUID generated! ')
                }else {
                    console.log('##Could not generate GUID!')
                }                
            } else if (event.data.to === 'graph:addUserID') {
                console.log('##Inside core: Adding userID: '+ event.data.body.userID);
                let success = runtime.graphConnector.addUserID(event.data.body.userID);
                if(success) {
                    console.log("!!!!Added \""+ event.data.body.userID +"\" successfully!!!!");
                } else {
                    console.log("!!!Error: \""+ event.data.body.userID +"\" already exists!!!");
                }
                parent.postMessage({to:'runtime:addUserID', body:{"result" : success}}, '*');
            } else if (event.data.to === 'graph:removeUserID') {
                let userID = event.data.body.userID;
                console.log('##Inside core: Removing userID: ' + userID);
                let success = runtime.graphConnector.removeUserID(userID);
                if(success){
                    console.log("!!!!Removed \""+ event.data.body.userID +"\" successfully!!!!");
                } else {
                    console.log("!!!!Error: \""+ event.data.body.userID +"\" does not exist!!!!");
                }
                parent.postMessage({to:'runtime:removeUserID', body:{"result" : success}}, '*');
            } else if (event.data.to === 'graph:addContact') {
                let guid = event.data.body.guid;
                let fname = event.data.body.fname;
                let lname = event.data.body.lname;
                console.log('##Inside Core: Adding a new contact with firstname: ' + fname+' '+lname+' GUDI: '+ guid);
                runtime.graphConnector.addContact(guid, fname, lname);
            } else if (event.data.to === 'graph:getContact') {
                let username = event.data.body.username;
                console.log("##Inside core: finding user with username: " + username);
                let userList = runtime.graphConnector.getContact(username);
                if(typeof userList != 'undefined'){
                    if (userList.length == 0) {
                        console.log('!!!!Contact with name \"'+username +'\" not found!!!!');
                        parent.postMessage({to:'runtime:getContact', body:{"found" : false}}, '*');
                    } else if (userList.length >= 1) {
                        console.log("!!!!Found matching users: ");
                        parent.postMessage({to:'runtime:getContact', body:{"found" : true, "userList": userList}}, '*');
                    }
                } 
            } else if (event.data.to === 'graph:checkGUID'){
                let guid = event.data.body.guid;

                console.log("##Inside core: looking conctacts of user with GUID: " + guid);
                
                let usersDirectContact = runtime.graphConnector.checkGUID(guid)[0][0];
                let usersFoF = runtime.graphConnector.checkGUID(guid)[0][1];

                if (usersDirectContact != null || usersDirectContact != '') {
                    console.log("Direct Friend found from given GUID: \n FirstName " + usersDirectContact.firstName +
                        "\n LastName " + usersDirectContact.lastName +
                        "\n GUID " + usersDirectContact.guid);
                parent.postMessage({to:'runtime:checkGUID', body :{"check": true, 'GUID': guid, 'usersFoF': usersFoF,'usersDirectContact':usersDirectContact}}, '*');
                    // Returns 2 Array of conected friends
                   //parent.postMessage({to:'runtime:checkGUID', body:{"userDirectContacts" : usersDirectContact, "usersFoF" : usersFoF}}, '*');
                } else {
                    console.log("##This user does not have any contacts stored!!");
                    parent.postMessage({to:'runtime:checkGUID', body :{"check": false, 'GUID': guid}}, '*');

                }
            } else if (event.data.to === 'graph:removeContact') {
                let guid = event.data.body.guid;
                console.log("##Inside core: Deleting user with GUID: " + guid);

                let success = runtime.graphConnector.removeContact(guid);
                if(success){
                    console.log("!!!!Contact with \""+ guid +"\" has been deleted successfully!!!!");
                } else {
                    console.log("!!!!Contact with \""+ guid +"\" does not exist!!!!");
                }
                parent.postMessage({to:'runtime:removeContact', body :{"result": success}}, '*');
            } else if (event.data.to === 'graph:useGUID') {
                let seed = event.data.body.seed;
                console.log("##Inside core: generating keys using seed: " + seed);
                runtime.graphConnector.useGUID(seed).then(function(global_registry_record){
                    console.log("Returned value is " + global_registry_record);
                }).catch(function(err){
                    console.log("Caught an error "+err);
                });
                console.log("##Seed is created");
            } else if (event.data.to === 'graph:sendGlobalRegistryRecord') {
                let jwt = event.data.body.jwt;
                console.log("##Inside core: Sending JWT with value: " + jwt);
                console.log("##Global Registry record sent, this function returns promise object : " + runtime.graphConnector.sendGlobalRegistryRecord(jwt));
            } else if (event.data.to === 'graph:queryGlobalRegistry') {
                let guid = event.data.body.guid;
                console.log("##Inside core: Querying with GUID: " + guid);
                runtime.graphConnector.queryGlobalRegistry(guid);
            } else if (event.data.to === 'graph:calculateBloomFilter1Hop') {
                console.log("##Inside bloom filter");
                console.log("##Calculating Bloom filter : " + runtime.graphConnector.calculateBloomFilter1Hop());
            } else if (event.data.to === 'graph:setBloomFilter1HopContact') {
                console.log("##Inside set bloom filter");
                let guid = event.data.body.guid;
                let bloomFilterOwner = runtime.graphConnector.contactsBloomFilter1Hop;
                console.log("##setting the bloom filter for a contact : " + runtime.graphConnector.setBloomFilter1HopContact(guid, bloomFilterOwner));
            } else if (event.data.to === 'graph:signGlobalRegistryRecord') {
                console.log("##Inside signing");
                console.log("##Signing and the returned JWT is : " + runtime.graphConnector.signGlobalRegistryRecord());
            } else if (event.data.to === 'graph:editContact') {
                console.log("##Inside Core: Edit Contact function to change guid, fname, lname and privacy");
                let guidOld = event.data.body.guidOld;
                let fname = event.data.body.fname;
                let lname = event.data.body.lname;
                let privStatus = event.data.body.privStatus;
                let guidNew = event.data.body.guidNew;
                let result = runtime.graphConnector.editContact(guidOld, fname, lname, guidNew, privStatus);
                console.log("##Old GUID is : " + guidOld +
                     "\nNew Guid is : " + result[0].guid +
                     "\nFirst Name is : " + result[0].firstName +
                     "\nLast Name is : " + result[0].lastName +
                     "\nPrivacy is : " + result[0].privateContact );
            }

        }, false);
        parent.postMessage({
            to: 'runtime:installed',
            body: {}
        }, '*');
    });