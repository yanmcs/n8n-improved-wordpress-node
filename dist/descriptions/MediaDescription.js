"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaFields = exports.mediaOperations = void 0;
// Placeholder for Media resource operations
exports.mediaOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Upload',
                value: 'upload',
                description: 'Upload a media file',
                action: 'Upload a media file',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get a media item',
                action: 'Get a media item',
            },
            {
                name: 'Get All',
                value: 'getAll',
                description: 'Get all media items',
                action: 'Get all media items',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a media item',
                action: 'Update a media item',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a media item',
                action: 'Delete a media item',
            },
        ],
        default: 'upload',
        displayOptions: {
            show: {
                resource: ['media'], // Show only when 'media' resource is selected
            },
        },
    },
];
// Placeholder for fields specific to Media operations
exports.mediaFields = [
    /*-------------------------------------------------------------------------- */
    /*                                media:upload                                */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'File Source',
        name: 'fileSource',
        type: 'options',
        options: [
            {
                name: 'Binary Data',
                value: 'binary',
            },
            {
                name: 'Public URL',
                value: 'url',
            },
        ],
        default: 'binary',
        description: 'Source of the file to upload',
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['upload'],
            },
        },
    },
    {
        displayName: 'Input Binary Field',
        name: 'binaryPropertyName',
        type: 'string',
        default: 'data',
        required: true,
        description: 'Name of the binary property which contains the data for the file to be uploaded',
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['upload'],
                fileSource: ['binary'],
            },
        },
    },
    {
        displayName: 'File URL',
        name: 'fileUrl',
        type: 'string',
        default: '',
        required: true,
        description: 'URL of the file to download and upload',
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['upload'],
                fileSource: ['url'],
            },
        },
    },
    {
        displayName: 'File Name',
        name: 'fileName',
        type: 'string',
        default: '',
        description: 'Optional: Name to give the uploaded file. If not provided, it will be inferred from the source.',
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['upload'],
            },
        },
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        description: 'Title for the media item',
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['upload', 'update'],
            },
        },
    },
    {
        displayName: 'Caption',
        name: 'caption',
        type: 'string',
        default: '',
        description: 'Caption for the media item',
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['upload', 'update'],
            },
        },
    },
    {
        displayName: 'Alt Text',
        name: 'altText',
        type: 'string',
        default: '',
        description: 'Alternative text for the media item',
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['upload', 'update'],
            },
        },
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description for the media item',
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['upload', 'update'],
            },
        },
    },
    // TODO: Add fields for post ID association, status, etc. for upload
    /*-------------------------------------------------------------------------- */
    /*                                media:update/get/delete                     */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Media ID',
        name: 'mediaId',
        type: 'string',
        required: true,
        default: '',
        description: 'ID of the media item',
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['update', 'get', 'delete'],
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
                resource: ['media'],
                operation: ['delete'],
            },
        },
    },
    // TODO: Add fields similar to upload but optional for update
    /*-------------------------------------------------------------------------- */
    /*                                media:getAll                                */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        description: 'Whether to return all results or only up to a given limit',
        displayOptions: {
            show: {
                resource: ['media'],
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
                resource: ['media'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
    },
    // TODO: Add filtering and pagination options for getAll (media_type, mime_type, search, author, etc.)
];
//# sourceMappingURL=MediaDescription.js.map