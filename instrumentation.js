// telemetry.js

import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { CollectorTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { ConsoleLogger, LogLevel } from '@opentelemetry/core';

// Function to initialize telemetry in the browser
export function initializeTelemetry(serviceName) {
  // 1. Initialize the provider for tracing in the browser
  const tracerProvider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName, // Use the provided service name
    }),
  });

  // 2. Set up the Collector exporter for traces
  const collectorExporter = new CollectorTraceExporter({
    url: 'http://localhost:4317/v1/traces', // Adjust this URL to point to your OpenTelemetry Collector
  });

  // Register the span processor for traces
  tracerProvider.addSpanProcessor(new SimpleSpanProcessor(collectorExporter));

  // Register the provider for use in the browser
  tracerProvider.register();

  // 3. Initialize MeterProvider for metrics
  const meterProvider = new MeterProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  // Create a meter instance
  const meter = meterProvider.getMeter(serviceName);

  // Define metrics: e.g., request count
  const requestCount = meter.createCounter('request_count', {
    description: 'Counts the number of requests',
  });

  // 4. Register instrumentations for Fetch and document load events
  registerInstrumentations({
    tracerProvider,
    instrumentations: [
      new FetchInstrumentation(), // Automatically trace fetch API requests
      new DocumentLoadInstrumentation(), // Automatically capture page load timings
    ],
  });

  // 5. Set up logging
  const logger = new ConsoleLogger(LogLevel.DEBUG);

  // Function to log errors
  const handleError = (error) => {
    logger.error(`Error occurred: ${error.message}`);
    // You could also capture error spans if needed
    const span = tracerProvider.getTracer('default').startSpan('error-span');
    span.setAttribute('error', error.message);
    span.end();
  };

  // 6. Custom event logging
  const logCustomEvent = (event) => {
    logger.info(`Custom event: ${event}`);
    const span = tracerProvider.getTracer('default').startSpan('custom-event');
    span.setAttribute('event', event);
    span.end();
  };

  // 7. Send logs (as custom telemetry)
  const logCustomMessage = (message) => {
    logger.info(`Log message: ${message}`);
    // Simulating a log span
    const span = tracerProvider.getTracer('default').startSpan('log-span');
    span.setAttribute('log.message', message);
    span.end();
  };

  // Return the metric, logging, and error-handling functions for use
  return {
    requestCount,
    handleError,
    logCustomEvent,
    logCustomMessage,
  };
}

