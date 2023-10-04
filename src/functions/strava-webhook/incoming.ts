import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { WebhookEvent } from '../../types';
const logger = new Logger();

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {APIGatewayProxyEvent} event - API Gateway Lambda Proxy Input Format
 * @param {Context} object - API Gateway Lambda $context variable
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {APIGatewayProxyResult} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  logger.debug('Lambda invocation event', { event });

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing body',
      }),
    };
  }

  const webhookEvent: WebhookEvent = JSON.parse(event.body);

  logger.debug('Webhook event', { webhookEvent });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'ok',
    }),
  };
};
