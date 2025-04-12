import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IDataObject, // Import IDataObject
} from 'n8n-workflow';
import { ICredentialDataDecryptedObject } from 'n8n-workflow'; // Import ICredentialDataDecryptedObject

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
export async function wordpressApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	// Get credentials
	const credentials = await this.getCredentials('wordpressApi') as ICredentialDataDecryptedObject;

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `${credentials.baseUrl}/wp-json${endpoint}`, // Use 'url' instead of 'uri'
		json: true,
		headers: {
			// Basic Auth using Application Password
			'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.applicationPassword}`).toString('base64')}`,
		},
		// Removed SSL handling property due to type errors. Default behavior will apply.
		// Consider adding specific handling if needed later.
	};

	try {
		// Use the built-in request function
		return await this.helpers.httpRequest(options);
	} catch (error) {
		// TODO: Implement improved error handling and retry logic here
		throw error; // Re-throw for now
	}
}

/**
 * Handles paginated responses from the WordPress API.
 * Fetches all items from a given endpoint.
 *
 * @param {IExecuteFunctions} this The context object
 * @param {string} endpoint The API endpoint (e.g., '/wp/v2/posts')
 * @param {IDataObject} [qs] Initial query string parameters
 * @returns {Promise<any[]>} An array containing all items
 */
export async function wordpressApiRequestAllItems(
	this: IExecuteFunctions,
	endpoint: string,
	qs: IDataObject = {},
): Promise<any[]> {
	const returnData: any[] = [];
	let response;
	let queryParameters: IDataObject = { ...qs, page: 1, per_page: 100 }; // Start with page 1, max 100 per page

	// TODO: Implement proper pagination handling using Link headers or total pages header (X-WP-TotalPages)
	// This is a simplified placeholder loop
	do {
		response = await wordpressApiRequest.call(this, 'GET', endpoint, {}, queryParameters);
		// Ensure response is an array before spreading
		if (Array.isArray(response)) {
			returnData.push(...response);
			// Increment page number safely
			queryParameters.page = (queryParameters.page as number) + 1;
		} else {
			// Handle non-array response (e.g., error or single object)
			// If it's a single object and we expected an array, maybe push it if appropriate?
			// Or log a warning/error. For now, just break.
			if (response && typeof response === 'object' && queryParameters.page === 1) {
				// If it's the first page and not an array, maybe it's a single result?
				// Depending on the API, this might be valid. Cautiously add it.
				returnData.push(response);
			}
			break; // Exit loop if response is not an array
		}

		// Basic check to prevent infinite loops in placeholder - replace with real pagination check
		if (response.length === 0 || response.length < 100) {
			break;
		}
	} while (true); // Replace with actual pagination condition

	return returnData;
}
