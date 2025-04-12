import { IExecuteFunctions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';
/**
 * Makes an authenticated request to the WordPress API.
 *
 * @param {IExecuteFunctions} this The context object
 * @param {IHttpRequestMethods} method The HTTP method (GET, POST, PUT, DELETE)
 * @param {string} endpoint The API endpoint (e.g., '/wp/v2/posts')
 * @param {IDataObject} [body] The request body for POST/PUT requests
 * @param {IDataObject} [qs] The query string parameters for GET requests
 * @returns {Promise<any>} The API response
 */
export declare function wordpressApiRequest(this: IExecuteFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject, qs?: IDataObject): Promise<any>;
/**
 * Handles paginated responses from the WordPress API.
 * Fetches all items from a given endpoint.
 *
 * @param {IExecuteFunctions} this The context object
 * @param {string} endpoint The API endpoint (e.g., '/wp/v2/posts')
 * @param {IDataObject} [qs] Initial query string parameters
 * @returns {Promise<any[]>} An array containing all items
 */
export declare function wordpressApiRequestAllItems(this: IExecuteFunctions, endpoint: string, qs?: IDataObject): Promise<any[]>;
