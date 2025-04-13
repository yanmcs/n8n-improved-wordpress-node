"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxonomyFields = exports.taxonomyOperations = void 0;
// Placeholder for Taxonomy resource operations
exports.taxonomyOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Create Term',
                value: 'createTerm',
                description: 'Create a new taxonomy term',
                action: 'Create a taxonomy term',
            },
            {
                name: 'Get Term',
                value: 'getTerm',
                description: 'Get a taxonomy term',
                action: 'Get a taxonomy term',
            },
            {
                name: 'Get All Terms',
                value: 'getAllTerms',
                description: 'Get all terms for a taxonomy',
                action: 'Get all taxonomy terms',
            },
            {
                name: 'Update Term',
                value: 'updateTerm',
                description: 'Update a taxonomy term',
                action: 'Update a taxonomy term',
            },
            {
                name: 'Delete Term',
                value: 'deleteTerm',
                description: 'Delete a taxonomy term',
                action: 'Delete a taxonomy term',
            },
            {
                name: 'Associate Terms',
                value: 'associateTerms',
                description: 'Associate terms with a post',
                action: 'Associate terms with post',
            },
            {
                name: 'Get All Taxonomies',
                value: 'getAllTaxonomies',
                description: 'Get all registered taxonomies',
                action: 'Get all taxonomies',
            },
        ],
        default: 'createTerm',
        displayOptions: {
            show: {
                resource: ['taxonomy'], // Show only when 'taxonomy' resource is selected
            },
        },
    },
];
// Placeholder for fields specific to Taxonomy operations
exports.taxonomyFields = [
    // Taxonomy Selector (needed for most term operations)
    {
        displayName: 'Taxonomy',
        name: 'taxonomy',
        type: 'options', // This should be dynamically populated
        required: true,
        default: 'category', // Default to category
        description: 'Select the taxonomy to manage (e.g., category, post_tag)',
        // TODO: Implement typeOptions.loadOptionsMethod to fetch taxonomies
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['createTerm', 'getTerm', 'getAllTerms', 'updateTerm', 'deleteTerm', 'associateTerms'],
            },
        },
    },
    /*-------------------------------------------------------------------------- */
    /*                            taxonomy:createTerm                             */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        description: 'Name of the new term',
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['createTerm', 'updateTerm'],
            },
        },
    },
    {
        displayName: 'Slug',
        name: 'slug',
        type: 'string',
        default: '',
        description: 'Slug for the term (URL-friendly version)',
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['createTerm', 'updateTerm'],
            },
        },
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
            rows: 3,
        },
        default: '',
        description: 'Description for the term',
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['createTerm', 'updateTerm'],
            },
        },
    },
    {
        displayName: 'Parent ID',
        name: 'parentId',
        type: 'string', // Or number
        default: '',
        description: 'ID of the parent term (for hierarchical taxonomies)',
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['createTerm', 'updateTerm'],
            },
        },
    },
    /*-------------------------------------------------------------------------- */
    /*                       taxonomy:updateTerm/getTerm/deleteTerm               */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Term ID',
        name: 'termId',
        type: 'string', // Or number
        required: true,
        default: '',
        description: 'ID of the taxonomy term',
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['updateTerm', 'getTerm', 'deleteTerm'],
            },
        },
    },
    {
        displayName: 'Force Delete',
        name: 'forceDelete',
        type: 'boolean',
        default: false,
        description: 'Whether to bypass the trash and force deletion (if applicable)',
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['deleteTerm'],
            },
        },
    },
    /*-------------------------------------------------------------------------- */
    /*                            taxonomy:getAllTerms                            */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        description: 'Whether to return all results or only up to a given limit',
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['getAllTerms'],
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
                resource: ['taxonomy'],
                operation: ['getAllTerms'],
                returnAll: [false],
            },
        },
    },
    // TODO: Add filtering and pagination options for getAllTerms (search, slug, parent, post, etc.)
    /*-------------------------------------------------------------------------- */
    /*                          taxonomy:associateTerms                           */
    /* ------------------------------------------------------------------------- */
    {
        displayName: 'Post ID',
        name: 'postId',
        type: 'string', // Or number
        required: true,
        default: '',
        description: 'ID of the post to associate terms with',
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['associateTerms'],
            },
        },
    },
    {
        displayName: 'Term IDs',
        name: 'termIds',
        type: 'string', // Expecting comma-separated IDs or JSON array string
        required: true,
        default: '',
        description: 'Comma-separated list or JSON array of term IDs to associate with the post',
        placeholder: '1, 2, 3 or ["1", "2", "3"]',
        displayOptions: {
            show: {
                resource: ['taxonomy'],
                operation: ['associateTerms'],
            },
        },
    },
    // TODO: Add option for append vs replace terms
    /*-------------------------------------------------------------------------- */
    /*                         taxonomy:getAllTaxonomies                          */
    /* ------------------------------------------------------------------------- */
    // No specific fields needed for getAllTaxonomies, it just fetches the list.
];
//# sourceMappingURL=TaxonomyDescription.js.map