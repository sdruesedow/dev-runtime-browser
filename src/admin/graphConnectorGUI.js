class graphConnectorGUI {

	constructor(graphConnector) {
		if (!graphConnector) throw Error('graph Connector is not set!');
		let mem;
		let jwt;

		$('.graphConnector-page-show').on('click', (event) => {
			$('.policies-section').addClass('hide');
			$('.identities-section').addClass('hide');
			$('.graphConnector-section').removeClass('hide');
		});

		return new Promise((resolve, reject) => {
			$('.generateGuid').off();
			$('.generateGuid').on('click', (event) => {

				console.info(graphConnector.generateGUID());
				console.info(graphConnector.addUserID('facebook.com/felix', 'google.com'));
				console.info(graphConnector.removeUserID('facebook.com/felix', 'google.com'));
				console.info(graphConnector.addContact('budc8fucd8cdsc98dc899dc', 'reThinkUser', 'Test'));
				console.info(graphConnector.getContact('reThinkUser'));
				console.info(graphConnector.checkGUID('budc8fucd8cdsc98dc899dc'));
				console.info(graphConnector.removeContact('budc8fucd8cdsc98dc899dc'));
				//adding contact again to do further testing
				console.info(graphConnector.addContact('budc8fucd8cdsc98dc899dc', 'reThinkUser', 'Test'));
				console.info(graphConnector.checkGUID('budc8fucd8cdsc98dc899dc'));
				//console.info(graphConnector.useGUID('grey climb demon snap shove fruit grasp hum self grey climb demon snap shove fruit grasp'));
				//console.info(graphConnector.sendGlobalRegistryRecord("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"));
				//console.info(graphConnector.queryGlobalRegistry('budc8fucd8cdsc98dc899dc'));
				console.info(graphConnector.calculateBloomFilter1Hop());
				//passing string instead of bloomfilter just for testing
				console.info(graphConnector.setBloomFilter1HopContact('budc8fucd8cdsc98dc899dc', 'bloomFilter'));
				console.info(graphConnector.signGlobalRegistryRecord());
				console.info(graphConnector.addContact('jdfjhdskfkdshfbdkfkjff989e', 'TestingNew', 'runtime'));
				console.info(graphConnector.editContact('jdfjhdskfkdshfbdkfkjff989e', 'TestingNew', 'runtime', 'hfjdsbsjfhdiusfbuidshfcudss87cv7ds8c7d', true));
				console.info(graphConnector.addContact('123456', 'john', 'snow'));
				console.info(graphConnector.addContact('1234', 'Joey', 'Landwunder'));
				console.info(graphConnector.addGroupName('123456', 'Winterfell'));
				console.info(graphConnector.addGroupName('1234', 'Winterfell'));
				console.info(graphConnector.getGroup('Winterfell'));
				console.info(graphConnector.removeGroupName('123456', 'Winterfell'));
				console.info(graphConnector.getAllContacts());
				console.info(graphConnector.setLocation('123456', 'Berlin'));
				console.info(graphConnector.removeLocation('123456'));
				console.info(graphConnector.setDefaults('a', 'b', 'c'));


			});

			$('.useGUID').off();
			$('.useGUID').on('click', (event) => {

				mem = graphConnector.generateGUID();

				console.info(graphConnector.addUserID('facebook.com/felix', 'google.com'));
				console.info(graphConnector.removeUserID('facebook.com/felix', 'google.com'));
				console.info(graphConnector.addContact('budc8fucd8cdsc98dc899dc', 'reThinkUser', 'Test'));
				console.info(graphConnector.getContact('reThinkUser'));
				console.info(graphConnector.checkGUID('budc8fucd8cdsc98dc899dc'));
				console.info(graphConnector.removeContact('budc8fucd8cdsc98dc899dc'));
				//adding contact again to do further testing
				console.info(graphConnector.addContact('budc8fucd8cdsc98dc899dc', 'reThinkUser', 'Test'));
				console.info(graphConnector.checkGUID('budc8fucd8cdsc98dc899dc'));
				console.info(graphConnector.setDefaults('a', 'b', 'c'))
				jwt = graphConnector.signGlobalRegistryRecord();
				console.info(graphConnector.sendGlobalRegistryRecord(jwt));

				console.info(graphConnector.useGUID(mem));
			});

			$('.sendGlobalRegistryRecord').off();
			$('.sendGlobalRegistryRecord').on('click', (event) => {

				console.info(graphConnector.generateGUID());
				console.info(graphConnector.addUserID('facebook.com/felix', 'google.com'));
				console.info(graphConnector.removeUserID('facebook.com/felix', 'google.com'));
				console.info(graphConnector.addContact('budc8fucd8cdsc98dc899dc', 'reThinkUser', 'Test'));
				console.info(graphConnector.getContact('reThinkUser'));
				console.info(graphConnector.checkGUID('budc8fucd8cdsc98dc899dc'));
				console.info(graphConnector.removeContact('budc8fucd8cdsc98dc899dc'));
				//adding contact again to do further testing
				console.info(graphConnector.addContact('budc8fucd8cdsc98dc899dc', 'reThinkUser', 'Test'));
				console.info(graphConnector.checkGUID('budc8fucd8cdsc98dc899dc'));
				console.info(graphConnector.setDefaults('a', 'b', 'c'))
				jwt = graphConnector.signGlobalRegistryRecord();
				console.info(graphConnector.sendGlobalRegistryRecord(jwt));

			});

			$('.queryGlobalRegistry').off();
			$('.queryGlobalRegistry').on('click', (event) => {

				console.info(graphConnector.queryGlobalRegistry('kV99Rn6o1EAPqkX2HXh-0IkETFFjphFAhz3XlLNYEh0'));
			});

		});

	}

}

export default graphConnectorGUI;
