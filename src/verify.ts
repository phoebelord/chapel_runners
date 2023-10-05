import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { getSecret } from '@aws-lambda-powertools/parameters/secrets';
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
  let response: APIGatewayProxyResult;

  logger.debug('Lambda invocation event', { event });

  // Append awsRequestId to each log statement
  logger.appendKeys({
    awsRequestId: context.awsRequestId,
  });

  const parameters = event.queryStringParameters;
  if (!parameters) {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing parameters',
      }),
    };
    return response;
  }

  const mode = parameters['hub.mode'];
  const token = parameters['hub.verify_token'];
  const challenge = parameters['hub.challenge'];

  const verify_token = await getSecret('chapel-runners/strava_verify_token');

  if (mode === 'subscribe' && token === verify_token) {
    logger.debug('Subscription request verified');
    response = {
      statusCode: 200,
      body: JSON.stringify({
        'hub.challenge': challenge,
      }),
    };
  } else {
    response = {
      statusCode: 403,
      body: '',
    };
  }

  return response;
};
