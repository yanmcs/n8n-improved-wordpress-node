"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postFields = exports.postOperations = void 0;
// Placeholder for Post resource operations and fields
exports.postOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        // Placeholder options
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new post',
                action: 'Create a post',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get a post',
                action: 'Get a post',
            },
            {
                name: 'Get All',
                value: 'getAll',
                description: 'Get all posts',
                action: 'Get all posts',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a post',
                action: 'Update a post',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a post',
                action: 'Delete a post',
            },
        ],
        default: 'create',
        displayOptions: {
            show: {
                resource: ['post'], // Show only when 'post' resource is selected
            },
        },
    },
];
// Placeholder for fields specific to Post operations
exports.postFields = [
    /*-------------------------------------------------------------------------- */
    /*                                post:create                                 */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        required: true,
        default: '',
        description: 'Title of the post',
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Content',
        name: 'content',
        type: 'string',
        typeOptions: {
            rows: 5,
        },
        default: '',
        description: 'Content of the post',
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['create'],
            },
        },
    },
    // TODO: Add more fields for create (status, author, excerpt, featured_media, etc.)
    // TODO: Add fields for update, get, getAll, delete operations
    /*-------------------------------------------------------------------------- */
    /*                                post:update                                 */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Post ID',
        name: 'postId',
        type: 'string', // Or number, depending on how it's handled
        required: true,
        default: '',
        description: 'ID of the post to update',
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['update', 'get', 'delete'], // Also used for get and delete
            },
        },
    },
    // TODO: Add fields similar to create but optional for update
    /*-------------------------------------------------------------------------- */
    /*                                post:getAll                                 */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        description: 'Whether to return all results or only up to a given limit',
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['getAll'],
            },
        },
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
            minValue: 1,
        },
        default: 50,
        description: 'Max number of results to return',
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
    },
    // TODO: Add filtering and pagination options for getAll (context, page, per_page, search, after, author, etc.)
];
//# sourceMappingURL=PostDescription.js.map