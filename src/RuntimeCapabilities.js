import webrtcSupport from 'webrtcsupport'

class RuntimeCapabilities {
	constructor(storageManager) {
		if (!storageManager) throw new Error('The Runtime Capabilities need the storageManager')

		this.storageManager = storageManager
		this.storageKey = 'capabilities'
		this.storageVersion = '1'
	}

	getRuntimeCapabilities() {
		return this.storageManager.get(this.storageKey)
			.then(capabilities => {
				if (capabilities)
					return capabilities
				return this.update().then(key => this.storageManager.get(key))
			})
	}

	isAvailable(cap) {
		return this.getRuntimeCapabilities()
			.then(capabilities => {
				return capabilities[cap]
			})
	}

	update() {
		const capabilities = this._getCapabilities()
		return this.storageManager.set(this.storageKey, this.storageVersion, capabilities)
	}

	_getCapabilities() {
		return {
			browser: !!window,
			node: !window,
			windowSandbox: !!window,
			webrtc: webrtcSupport.support,
			datachannel: webrtcSupport.supportDataChannel
		}
	}
}

export default RuntimeCapabilities
