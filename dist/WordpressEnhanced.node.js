"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordpressEnhanced = void 0;
// Import descriptions
const PostDescription_1 = require("./descriptions/PostDescription");
const PageDescription_1 = require("./descriptions/PageDescription");
const MediaDescription_1 = require("./descriptions/MediaDescription");
const CommentDescription_1 = require("./descriptions/CommentDescription");
const TaxonomyDescription_1 = require("./descriptions/TaxonomyDescription");
// TODO: Import descriptions for Custom Post Type
// Import Credentials
const WordpressApiCredentials_1 = require("./WordpressApiCredentials");
// Import Generic Functions
const GenericFunctions_1 = require("./GenericFunctions");
class WordpressEnhanced {
    constructor() {
        this.description = {
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
            inputs: ["main" /* NodeConnectionType.Main */], // Use NodeConnectionType
            outputs: ["main" /* NodeConnectionType.Main */], // Use NodeConnectionType
            credentials: [
                WordpressApiCredentials_1.WordpressApiCredentials, // Use the credential class directly
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
                ...PostDescription_1.postOperations,
                ...PostDescription_1.postFields,
                // Operations and Fields for Page resource
                ...PageDescription_1.pageOperations,
                ...PageDescription_1.pageFields,
                // Operations and Fields for Media resource
                ...MediaDescription_1.mediaOperations,
                ...MediaDescription_1.mediaFields,
                // Operations and Fields for Comment resource
                ...CommentDescription_1.commentOperations,
                ...CommentDescription_1.commentFields,
                // Operations and Fields for Taxonomy resource
                ...TaxonomyDescription_1.taxonomyOperations,
                ...TaxonomyDescription_1.taxonomyFields,
                // TODO: Add operations and fields for Custom Post Type
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        let responseData = [];
        let responseItem; // To store API response
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                const resource = this.getNodeParameter('resource', itemIndex, '');
                const operation = this.getNodeParameter('operation', itemIndex, '');
                // --------------- Handle Post Resource ---------------
                if (resource === 'post') {
                    const postId = this.getNodeParameter('postId', itemIndex, ''); // For get, update, delete
                    const returnAll = this.getNodeParameter('returnAll', itemIndex, false); // For getAll
                    const limit = this.getNodeParameter('limit', itemIndex, 50); // For getAll
                    let endpoint = '/wp/v2/posts';
                    let body = {}; // Correct type is already imported
                    let qs = {}; // Correct type is already imported
                    if (operation === 'create') {
                        body.title = this.getNodeParameter('title', itemIndex, '');
                        body.content = this.getNodeParameter('content', itemIndex, '');
                        // TODO: Add other create fields (status, author, etc.)
                        responseItem = await GenericFunctions_1.wordpressApiRequest.call(this, 'POST', endpoint, body);
                    }
                    else if (operation === 'get') {
                        if (!postId)
                            throw new Error('Post ID is required for Get operation');
                        endpoint = `/wp/v2/posts/${postId}`;
                        // TODO: Add query params like _fields, context
                        responseItem = await GenericFunctions_1.wordpressApiRequest.call(this, 'GET', endpoint);
                    }
                    else if (operation === 'getAll') {
                        // TODO: Add filtering options to qs
                        if (returnAll) {
                            responseItem = await GenericFunctions_1.wordpressApiRequestAllItems.call(this, endpoint, qs);
                        }
                        else {
                            qs.per_page = limit;
                            responseItem = await GenericFunctions_1.wordpressApiRequest.call(this, 'GET', endpoint, {}, qs);
                        }
                    }
                    else if (operation === 'update') {
                        if (!postId)
                            throw new Error('Post ID is required for Update operation');
                        endpoint = `/wp/v2/posts/${postId}`;
                        // Get only fields that are meant for update (check description file)
                        const title = this.getNodeParameter('title', itemIndex, undefined);
                        const content = this.getNodeParameter('content', itemIndex, undefined);
                        if (title !== undefined)
                            body.title = title;
                        if (content !== undefined)
                            body.content = content;
                        // TODO: Add other update fields
                        responseItem = await GenericFunctions_1.wordpressApiRequest.call(this, 'POST', endpoint, body); // WP uses POST for update
                    }
                    else if (operation === 'delete') {
                        if (!postId)
                            throw new Error('Post ID is required for Delete operation');
                        endpoint = `/wp/v2/posts/${postId}`;
                        const forceDelete = this.getNodeParameter('forceDelete', itemIndex, false); // Assuming forceDelete field exists
                        qs.force = forceDelete;
                        responseItem = await GenericFunctions_1.wordpressApiRequest.call(this, 'DELETE', endpoint, {}, qs);
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
                const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(Array.isArray(responseItem) ? responseItem : [responseItem]), { itemData: { item: itemIndex } });
                responseData = responseData.concat(executionData);
            }
            catch (error) {
                // Handle unknown error type
                let errorMessage = 'An unknown error occurred';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                else if (typeof error === 'string') {
                    errorMessage = error;
                }
                // Consider logging the full error object for debugging if needed
                // console.error(error);
                if (this.continueOnFail()) {
                    const executionErrorData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray([{ error: errorMessage }]), // Use extracted message
                    { itemData: { item: itemIndex } });
                    responseData = responseData.concat(executionErrorData);
                    continue;
                }
                throw error;
            }
        }
        return [responseData];
    }
}
exports.WordpressEnhanced = WordpressEnhanced;
//# sourceMappingURL=WordpressEnhanced.node.js.map