import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'gcp-tasks',
	name: 'Google Cloud Tasks',
	icon: 'checklist',
	description: 'Publish http task on GCP Cloud Tasks',
	overview: ({ queue, url, payload }) => [
		{
			label: 'Queue',
			text: queue,
		},
		{
			label: 'Url',
			text: url,
		},
		{
			label: 'Payload',
			text: payload,
		},
	],
	options: [
		{
			field: 'project',
			name: 'Project',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
		},
		{
			field: 'queue',
			name: 'Queue',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
		},
		{
			field: 'location',
			name: 'Location',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
		},
		{
			field: 'url',
			name: 'Url',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
		},
		{
			field: 'payload',
			name: 'Payload',
			type: 'string',
			meta: {
				width: 'full',
				interface: 'input',
			},
		},
		{
			field: 'delay',
			name: 'Delay',
			type: 'integer',
			meta: {
				width: 'full',
				interface: 'input',
			},
		},
	],
});
