
import * as cdk from '@aws-cdk/core';
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import { Policy, PolicyStatement } from '@aws-cdk/aws-iam';

export class TranslatorStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const handler = new lambda.Function(this, "Translator", {
      runtime: lambda.Runtime.PYTHON_3_8, // So we can use async in widget.js
      code: lambda.Code.fromAsset("lambda"),
      handler: "app.lambda_handler",
      environment: {        
      }
    });

    new apigateway.LambdaRestApi(this, 'Endpoint', {
      handler: handler
    });

    const translatePolicyStatement = new PolicyStatement({
      actions: ['translate:TranslateText'],
      resources: ['*']
    });

    handler.role?.attachInlinePolicy(
      new Policy(this, "PutTranslatePolicy", {
        statements: [translatePolicyStatement]
      })
    )
  }
}
