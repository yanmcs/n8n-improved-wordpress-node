import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	INodeProperties,
	NodeConnectionType, // Import NodeConnectionType
	IDataObject, // Import IDataObject
} from 'n8n-workflow';

// Import descriptions
import { postOperations, postFields } from './descriptions/PostDescription';
import { pageOperations, pageFields } from './descriptions/PageDescription';
import { mediaOperations, mediaFields } from './descriptions/MediaDescription';
import { commentOperations, commentFields } from './descriptions/CommentDescription';
import { taxonomyOperations, taxonomyFields } from './descriptions/TaxonomyDescription';
// TODO: Import descriptions for Custom Post Type

// Import Credentials
import { WordpressApiCredentials } from './WordpressApiCredentials.credentials'; // Update filename

// Import Generic Functions
import { wordpressApiRequest, wordpressApiRequestAllItems } from './GenericFunctions';

export class WordpressEnhanced implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WordPress Enhanced',
		name: 'wordpressEnhanced',
		// Placeholder icon
		icon: 'file:wordpress.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with WordPress REST API with enhanced features',
		defaults: {
			name: 'WordPress Enhanced',
		},
		inputs: [NodeConnectionType.Main], // Use NodeConnectionType
		outputs: [NodeConnectionType.Main], // Use NodeConnectionType
		credentials: [
			WordpressApiCredentials, // Use the credential class directly
			// TODO: Add OAuth2 credential type later
		],
		properties: [
			// Resource Selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Page',
						value: 'page',
					},
					{
						name: 'Media',
						value: 'media',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'Taxonomy',
						value: 'taxonomy',
					},
					// TODO: Add Custom Post Type resource (dynamically?)
				],
				default: 'post',
				description: 'The resource to operate on',
			},

			// Operations and Fields for Post resource
			...postOperations,
			...postFields,

			// Operations and Fields for Page resource
			...pageOperations,
			...pageFields,

			// Operations and Fields for Media resource
			...mediaOperations,
			...mediaFields,

			// Operations and Fields for Comment resource
			...commentOperations,
			...commentFields,

			// Operations and Fields for Taxonomy resource
			...taxonomyOperations,
			...taxonomyFields,

			// TODO: Add operations and fields for Custom Post Type
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData: INodeExecutionData[] = [];
		let responseItem: any; // To store API response

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex, '') as string;
				const operation = this.getNodeParameter('operation', itemIndex, '') as string;

				// --------------- Handle Post Resource ---------------
				if (resource === 'post') {
					const postId = this.getNodeParameter('postId', itemIndex, '') as string; // For get, update, delete
					const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean; // For getAll
					const limit = this.getNodeParameter('limit', itemIndex, 50) as number; // For getAll

					let endpoint = '/wp/v2/posts';
					let body: IDataObject = {}; // Correct type is already imported
					let qs: IDataObject = {}; // Correct type is already imported

					if (operation === 'create') {
						body.title = this.getNodeParameter('title', itemIndex, '') as string;
						body.content = this.getNodeParameter('content', itemIndex, '') as string;
						// TODO: Add other create fields (status, author, etc.)
						responseItem = await wordpressApiRequest.call(this, 'POST', endpoint, body);
					} else if (operation === 'get') {
						if (!postId) throw new Error('Post ID is required for Get operation');
						endpoint = `/wp/v2/posts/${postId}`;
						// TODO: Add query params like _fields, context
						responseItem = await wordpressApiRequest.call(this, 'GET', endpoint);
					} else if (operation === 'getAll') {
						// TODO: Add filtering options to qs
						if (returnAll) {
							responseItem = await wordpressApiRequestAllItems.call(this, endpoint, qs);
						} else {
							qs.per_page = limit;
							responseItem = await wordpressApiRequest.call(this, 'GET', endpoint, {}, qs);
						}
					} else if (operation === 'update') {
						if (!postId) throw new Error('Post ID is required for Update operation');
						endpoint = `/wp/v2/posts/${postId}`;
						// Get only fields that are meant for update (check description file)
						const title = this.getNodeParameter('title', itemIndex, undefined) as string | undefined;
						const content = this.getNodeParameter('content', itemIndex, undefined) as string | undefined;
						if (title !== undefined) body.title = title;
						if (content !== undefined) body.content = content;
						// TODO: Add other update fields
						responseItem = await wordpressApiRequest.call(this, 'POST', endpoint, body); // WP uses POST for update
					} else if (operation === 'delete') {
						if (!postId) throw new Error('Post ID is required for Delete operation');
						endpoint = `/wp/v2/posts/${postId}`;
						const forceDelete = this.getNodeParameter('forceDelete', itemIndex, false) as boolean; // Assuming forceDelete field exists
						qs.force = forceDelete;
						responseItem = await wordpressApiRequest.call(this, 'DELETE', endpoint, {}, qs);
					}
				}
				// --------------- Handle Page Resource ---------------
				else if (resource === 'page') {
					// TODO: Implement Page resource logic (similar to Post)
					responseItem = { message: `Page operation '${operation}' not implemented yet.` };
				}
				// --------------- Handle Media Resource ---------------
				else if (resource === 'media') {
					// TODO: Implement Media resource logic (upload needs special handling)
					responseItem = { message: `Media operation '${operation}' not implemented yet.` };
				}
				// --------------- Handle Comment Resource ---------------
				else if (resource === 'comment') {
					// TODO: Implement Comment resource logic
					responseItem = { message: `Comment operation '${operation}' not implemented yet.` };
				}
				// --------------- Handle Taxonomy Resource ---------------
				else if (resource === 'taxonomy') {
					// TODO: Implement Taxonomy resource logic
					responseItem = { message: `Taxonomy operation '${operation}' not implemented yet.` };
				}
				// --------------- Handle Custom Post Type ---------------
				// TODO: Add logic for custom post types (will need dynamic endpoint construction)
				else {
					throw new Error(`Resource '${resource}' is not supported yet.`);
				}

				// Prepare output data
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(Array.isArray(responseItem) ? responseItem : [responseItem]),
					{ itemData: { item: itemIndex } },
				);
				responseData = responseData.concat(executionData);

			} catch (error) {
				// Handle unknown error type
				let errorMessage = 'An unknown error occurred';
				if (error instanceof Error) {
					errorMessage = error.message;
				} else if (typeof error === 'string') {
					errorMessage = error;
				}
				// Consider logging the full error object for debugging if needed
				// console.error(error);

				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray([{ error: errorMessage }]), // Use extracted message
						{ itemData: { item: itemIndex } },
					);
					responseData = responseData.concat(executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [responseData];
	}
}
