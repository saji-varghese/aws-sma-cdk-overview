import boto3
import json
translate_client = boto3.client('translate')
def lambda_handler(event, context):
    print ("event : %s" % json.dumps(event['body']))
    x = event['body']
    req = json.loads(x)
    text_to_translate =  req['text']
    translate_to = req['translateTo']
    translate_response = translate_client.translate_text(
        Text=text_to_translate,
        SourceLanguageCode='en',
        TargetLanguageCode=translate_to
    )
    print(translate_response['TranslatedText'])
    return {
            'isBase64Encoded': False,
            'statusCode': 200,
            'headers': {},
            'multiValueHeaders': {},
            'body': translate_response['TranslatedText']
          }