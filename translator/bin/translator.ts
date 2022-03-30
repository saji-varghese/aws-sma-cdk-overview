#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { TranslatorStack } from '../lib/translator-stack';

const app = new cdk.App();
new TranslatorStack(app, 'TranslatorStack');
