import { INodeProperties } from 'n8n-workflow';

// Placeholder for Page resource operations (similar to Post)
export const pageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new page',
				action: 'Create a page',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a page',
				action: 'Get a page',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all pages',
				action: 'Get all pages',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a page',
				action: 'Update a page',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a page',
				action: 'Delete a page',
			},
		],
		default: 'create',
		displayOptions: {
			show: {
				resource: ['page'], // Show only when 'page' resource is selected
			},
		},
	},
];

// Placeholder for fields specific to Page operations (similar to Post)
export const pageFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                page:create                                 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'Title of the page',
		displayOptions: {
			show: {
				resource: ['page'],
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
		description: 'Content of the page',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['create'],
			},
		},
	},
	// TODO: Add more fields for create (status, author, excerpt, featured_media, parent, menu_order, etc.)

	/*-------------------------------------------------------------------------- */
	/*                                page:update                                 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the page to update',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['update', 'get', 'delete'], // Also used for get and delete
			},
		},
	},
	// TODO: Add fields similar to create but optional for update

	/*-------------------------------------------------------------------------- */
	/*                                page:getAll                                 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['page'],
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
				resource: ['page'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
	},
	// TODO: Add filtering and pagination options for getAll
];
