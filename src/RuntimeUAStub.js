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
import app from './ContextApp';
import URI from 'urijs';
import { create as createIframe } from './iframe';

let iframe = undefined;
let buildMsg = (hypertyComponent, msg) => {
        return {
         runtimeHypertyURL: msg.body.runtimeHypertyURL,
         status: msg.body.status,
         instance: hypertyComponent.instance,
         name: hypertyComponent.name
       }
};

let runtimeAdapter = {
    requireHyperty: (hypertyDescriptor)=>{
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'core:loadHyperty', body:{descriptor: hypertyDescriptor}}, '*');
        });
    },

    requireProtostub: (domain)=>{
        iframe.contentWindow.postMessage({to:'core:loadStub', body:{"domain": domain}}, '*')
    },

	generateGUID: ()=>{
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
		    iframe.contentWindow.postMessage({to:'graph:generateGUID', body:{}}, '*')
        });
	},

    
    getAllContacts: ()=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:getAllContacts', body:{}}, '*')
        });
    },

    addGroupName: (guid, groupName)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:addGroupName', body:{"guid": guid,"groupName":groupName }}, '*')
        });
    },

    removeGroupName: (guid, groupName)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:removeGroupName', body:{"guid": guid,"groupName":groupName}}, '*')
        });
    },



    getGroup: (groupName)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:getGroup', body:{"groupName":groupName}}, '*')
        });
    },

    getGroupNames: ()=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:getGroupNames', body:{}}, '*')
        });
    },


     setLocation: (guid, locationName)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:setLocation', body:{"guid": guid, "locationName": locationName}}, '*')
        });
    },

    removeLocation: (guid)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:removeLocation', body:{"guid": guid}}, '*')
        });
    },
    

	addUserID: (userID)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
		    iframe.contentWindow.postMessage({to:'graph:addUserID', body:{"userID" : userID}}, '*')
        });
	},

    removeUserID: (userID)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:removeUserID', body:{"userID" : userID}}, '*')
        });
    },

    addContact: (guid, fname, lname)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:addContact', body:{"guid": guid,"fname": fname,"lname": lname}}, '*')
        });
    },

    getContact: (username)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:getContact', body:{"username": username}}, '*')
        });
    },

    checkGUID: (guid)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:checkGUID', body:{"guid": guid}}, '*')
        });
    },

    removeContact: (guid)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:removeContact', body:{"guid": guid}}, '*')
        });
    },

    useGUID: (seed)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:useGUID', body:{"seed": seed}}, '*')
        });
    },

    sendGlobalRegistryRecord: (jwt)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:sendGlobalRegistryRecord', body:{"jwt": jwt}}, '*')
        });
    },

    queryGlobalRegistry: (guid)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:queryGlobalRegistry', body:{"guid": guid}}, '*')
        });
    },

    calculateBloomFilter1Hop: ()=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:calculateBloomFilter1Hop', body:{}}, '*')
        });
    },

    signGlobalRegistryRecord: ()=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:signGlobalRegistryRecord', body:{}}, '*')
        });
    },

    editContact: (guidOld, fname, lname, guidNew, privStatus)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:editContact', body:{"guidOld": guidOld, "fname": fname, "lname": lname, "guidNew": guidNew, "privStatus": privStatus}}, '*')
        });
    },

    setBloomFilter1HopContact: (guid)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:setBloomFilter1HopContact', body:{"guid": guid}}, '*')
        });
    },

    getOwner: ()=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'graph:getOwner', body:{}}, '*')
        });
    },

    setOwnerName: (firstName, lastName)=> {
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:loadedHyperty'){
                    window.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            window.addEventListener('message', loaded);
            resolve(firstName);
            iframe.contentWindow.postMessage({to:'graph:setOwnerName', body:{'firstName': firstName, 'lastName': lastName}}, '*')
        });
    },

    close: ()=>{
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:runtimeClosed'){
                    window.removeEventListener('message', loaded);
                    resolve(resolve(e.data.body));
                }
            };
            window.addEventListener('message', loaded);
            iframe.contentWindow.postMessage({to:'core:close', body:{}}, '*')
        })
    }

};

let GuiManager = function(){
  window.addEventListener('message', (e) => {
    if(e.data.to === 'runtime:gui-manager') {

      if (e.data.body.method === 'showAdminPage') {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
      } else {
        if (e.data.body.method === 'hideAdminPage') {
          iframe.style.width = '40px';
          iframe.style.height = '40px';
        }
      }

    }
  });
}

let RethinkBrowser = {
    install: function({domain, runtimeURL, development}={}){
        return new Promise((resolve, reject)=>{
            let runtime = this._getRuntime(runtimeURL, domain, development)
            iframe = createIframe(`https://${runtime.domain}/.well-known/runtime/index.html?runtime=${runtime.url}&development=${development}`);
            let installed = (e)=>{
                if(e.data.to === 'runtime:installed'){
                    window.removeEventListener('message', installed);
                    resolve(runtimeAdapter);
                }
            };
            window.addEventListener('message', installed);
            app.create(iframe);
            GuiManager()
        });
    },

    _getRuntime (runtimeURL, domain, development) {
        if(!!development){
            runtimeURL = runtimeURL || 'hyperty-catalogue://catalogue.' + domain + '/.well-known/runtime/Runtime'
            domain = domain || new URI(runtimeURL).host()
        }else{
            runtimeURL = runtimeURL || `https://catalogue.${domain}/.well-known/runtime/default`
            domain = domain || new URI(runtimeURL).host().replace("catalogue.", "")
        }

        return {
            "url": runtimeURL,
            "domain": domain
        }
    }
};

export default RethinkBrowser
