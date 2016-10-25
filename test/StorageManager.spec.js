import chai from 'chai'
import storageManager from '../src/StorageManager'

let expect = chai.expect

describe('StorageManager', function(){
	describe('set', function(){
		it('should set the value for a given key-version tuple', function(done){
			storageManager.set('key', 'v1.0.0', {})
				.then( key => {
					expect(key).to.be.eql('key')
					done()
				})
		})
	})

	describe('get', function(){
		it('should get the value for a given key', function(done){
			storageManager.set('key', 'v1.0.0', {name:'test'})
				.then(() => {
					storageManager.get('key')
						.then( object => {
							expect(object).to.be.eql({name:'test'})
							done()
						})

				})
		})
	})

	describe('getVersion', function(){
		it('should get the value version for a given key', function(done){
			storageManager.set('key', 'v1.0.0', {})
				.then(() => {
					storageManager.getVersion('key')
						.then(version => {
							expect(version).to.be.eql('v1.0.0')
							done()
						})
				})
		})
	})

	describe('delete', function(){
		it('should remove a value from StorageManager for a given key', function(done){
			storageManager.set('key', 'v1.0.0', {})
				.then(() => {
					storageManager.delete('key')
						.then(affected_records => {
							expect(affected_records).to.be.eql(1)
							done()
						})
				})
		})
	})
})
