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
import PersistenceManager from 'service-framework/dist/PersistenceManager'
import SandboxWorker from './SandboxWorker'
import SandboxApp from './SandboxApp'
import SandboxWindow from './SandboxWindow'
import Request from './Request'
import storageManager from 'service-framework/dist/StorageManager'
import Dexie from 'dexie'
import { RuntimeCatalogue } from 'service-framework/dist/RuntimeCatalogue'

let appSandbox
const RuntimeFactory = (port) => Object.create({
	createSandboxWindow() {
		return new SandboxWindow(port)
	},

	createSandbox() {
		return new SandboxWindow(port)
		//return new SandboxWorker('./context-service.js')
	},

	createAppSandbox() {
		if(!appSandbox)
			appSandbox = new SandboxApp(port)

		return appSandbox
	},

	createHttpRequest() {
		let request = new Request()
		return request
	},

	createRuntimeCatalogue() {
		if (!this.catalogue)
			this.catalogue = new RuntimeCatalogue(this)

		return this.catalogue
	},

	atob(b64) {
		return atob(b64)
	},

	persistenceManager() {
		//let localStorage = window.localStorage
		//return new PersistenceManager(localStorage)
		return new PersistenceManager({
			setItem: ()=>{},
			getItem: ()=>{ throw new Error() }
		})
	},

	storageManager() {
		const db = new Dexie('cache')
		const storeName = 'objects'

		return new storageManager(db, storeName)
	}
})

export default RuntimeFactory
