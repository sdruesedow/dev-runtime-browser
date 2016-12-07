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
                    iframe.port.removeEventListener('message', loaded);
                    resolve(buildMsg(app.getHyperty(e.data.body.runtimeHypertyURL), e.data));
                }
            };
            iframe.port.addEventListener('message', loaded);
            iframe.port.postMessage({to:'core:loadHyperty', body:{descriptor: hypertyDescriptor}});
        });
    },

    requireProtostub: (domain)=>{
        iframe.port.postMessage({to:'core:loadStub', body:{"domain": domain}})
    },

    close: ()=>{
        return new Promise((resolve, reject)=>{
            let loaded = (e)=>{
                if(e.data.to === 'runtime:runtimeClosed'){
                    iframe.port.removeEventListener('message', loaded);
                    resolve(resolve(e.data.body));
                }
            };
            iframe.port.addEventListener('message', loaded);
            iframe.port.postMessage({to:'core:close', body:{}})
        })
    },
};

let GuiManager = function(){
  iframe.port.addEventListener('message', (e) => {
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
            //iframe = createIframe(`https://${runtime.domain}/.well-known/runtime/index.html?runtime=${runtime.url}&development=${development}`);
            let url = `https://${runtime.domain}/.well-known/runtime/core.js?runtime=${runtime.url}&development=${development}`
			console.log(url)
			iframe = new SharedWorker(url)
			iframe.port.start()
			let installed = (e)=>{
                if(e.data.to === 'runtime:installed'){
                    iframe.port.removeEventListener('message', installed)
                    resolve(runtimeAdapter)
                }
            };
            iframe.port.addEventListener('message', installed)
            //app.create(iframe);
            //GuiManager()
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
