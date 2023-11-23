import { defineOperationApi } from '@directus/extensions-sdk';
import { createError } from '@directus/errors';
import { CloudTasksClient } from '@google-cloud/tasks';

// Instantiates a client.
const client = new CloudTasksClient();

type Options = {
	project: string
	queue: string
	location: string
	url: string
	payload: string
	delay: string
};

const GCPTaskError = createError<any>('GCP_TASK_ERROR', 'Basic error', 500);

export default defineOperationApi<Options>({
	id: 'gcp-tasks',
	handler: async ({ project, queue, location, url, payload, delay }, { logger }) => {
		try {
			const convertedPayload = JSON.stringify(payload);

			logger.info(`gcp-tasks started`)
			logger.info(`project: ${project}`)
			logger.info(`queue: ${queue}`)
			logger.info(`location: ${location}`)
			logger.info(`url: ${url}`)
			logger.info(`payload: ${convertedPayload}`)
			logger.info(`delay: ${delay}`)

			const parent = client.queuePath(project, location, queue);

			const body = Buffer.from(convertedPayload).toString('base64');

			const task: Record<string, any> = {
				httpRequest: {
					headers: {
						'Content-Type': 'application/json', // Set content type to ensure compatibility your application's request parsing
					},
					httpMethod: 'POST',
					url,
					body
				},
			};

			if (delay) {
				task.scheduleTime = {
					seconds: parseInt(delay) + Date.now() / 1000,
				};
			}

			logger.info('Sending task:');
			logger.info(task);

			const request = { parent, task };
			const [response] = await client.createTask(request);
			logger.info(`Task created ${response.name}`);

			return `Task created ${response.name}`
		} catch (err) {
			throw new GCPTaskError(err)
		}
	},
});
