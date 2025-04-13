"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentFields = exports.commentOperations = void 0;
// Placeholder for Comment resource operations
exports.commentOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new comment',
                action: 'Create a comment',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get a comment',
                action: 'Get a comment',
            },
            {
                name: 'Get All',
                value: 'getAll',
                description: 'Get all comments',
                action: 'Get all comments',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a comment',
                action: 'Update a comment',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a comment',
                action: 'Delete a comment',
            },
        ],
        default: 'create',
        displayOptions: {
            show: {
                resource: ['comment'], // Show only when 'comment' resource is selected
            },
        },
    },
];
// Placeholder for fields specific to Comment operations
exports.commentFields = [
    /*-------------------------------------------------------------------------- */
    /*                                comment:create                              */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Post ID',
        name: 'postId',
        type: 'string', // Or number
        required: true,
        default: '',
        description: 'The ID of the post the comment is associated with',
        displayOptions: {
            show: {
                resource: ['comment'],
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
        required: true,
        default: '',
        description: 'Content of the comment',
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['create', 'update'],
            },
        },
    },
    {
        displayName: 'Author Name',
        name: 'authorName',
        type: 'string',
        default: '',
        description: 'Name of the comment author',
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Author Email',
        name: 'authorEmail',
        type: 'string',
        default: '',
        description: 'Email of the comment author',
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Parent ID',
        name: 'parentId',
        type: 'string', // Or number
        default: '',
        description: 'ID of the parent comment to make this a reply',
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['create'],
            },
        },
    },
    // TODO: Add fields for status, author URL, etc. for create
    /*-------------------------------------------------------------------------- */
    /*                                comment:update/get/delete                   */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Comment ID',
        name: 'commentId',
        type: 'string', // Or number
        required: true,
        default: '',
        description: 'ID of the comment',
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['update', 'get', 'delete'],
            },
        },
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
            { name: 'Approved', value: 'approved' },
            { name: 'Hold', value: 'hold' },
            { name: 'Spam', value: 'spam' },
            { name: 'Trash', value: 'trash' },
        ],
        default: 'approved',
        description: 'Status of the comment',
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['update'],
            },
        },
    },
    {
        displayName: 'Force Delete',
        name: 'forceDelete',
        type: 'boolean',
        default: false,
        description: 'Whether to bypass the trash and force deletion',
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['delete'],
            },
        },
    },
    // TODO: Add other updatable fields (content, author info if allowed)
    /*-------------------------------------------------------------------------- */
    /*                                comment:getAll                              */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        description: 'Whether to return all results or only up to a given limit',
        displayOptions: {
            show: {
                resource: ['comment'],
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
                resource: ['comment'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
    },
    // TODO: Add filtering and pagination options for getAll (post, status, search, author_email, parent, etc.)
];
//# sourceMappingURL=CommentDescription.js.map