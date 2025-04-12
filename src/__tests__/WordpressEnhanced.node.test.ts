import { WordpressEnhanced } from '../WordpressEnhanced.node';

describe('WordpressEnhanced Node', () => {
	it('should instantiate the class', () => {
		const node = new WordpressEnhanced();
		expect(node).toBeInstanceOf(WordpressEnhanced);
	});

	it('should have a description property', () => {
		const node = new WordpressEnhanced();
		expect(node.description).toBeDefined();
		expect(node.description.name).toEqual('wordpressEnhanced');
		expect(node.description.displayName).toEqual('WordPress Enhanced');
	});

	// TODO: Add more tests for properties, credentials, and execute method
});
