import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
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

  // Log the incoming event
  logger.info('Lambda invocation event', { event });

  // Append awsRequestId to each log statement
  logger.appendKeys({
    awsRequestId: context.awsRequestId,
  });

  try {
    // hello world code
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world',
      }),
    };
    logger.info(`Successful response from API enpoint: ${event.path}`, response.body);
  } catch (err) {
    // Error handling
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
    logger.error(`Error response from API enpoint: ${err}`, response.body);
  }

  return response;
};
