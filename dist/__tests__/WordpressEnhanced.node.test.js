"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WordpressEnhanced_node_1 = require("../WordpressEnhanced.node");
describe('WordpressEnhanced Node', () => {
    it('should instantiate the class', () => {
        const node = new WordpressEnhanced_node_1.WordpressEnhanced();
        expect(node).toBeInstanceOf(WordpressEnhanced_node_1.WordpressEnhanced);
    });
    it('should have a description property', () => {
        const node = new WordpressEnhanced_node_1.WordpressEnhanced();
        expect(node.description).toBeDefined();
        expect(node.description.name).toEqual('wordpressEnhanced');
        expect(node.description.displayName).toEqual('WordPress Enhanced');
    });
    // TODO: Add more tests for properties, credentials, and execute method
});
//# sourceMappingURL=WordpressEnhanced.node.test.js.map