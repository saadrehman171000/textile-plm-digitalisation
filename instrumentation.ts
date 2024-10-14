// Import necessary modules for OpenTelemetry and Pino logging
import { registerOTel } from '@vercel/otel'; // Function to register OpenTelemetry settings and configurations
import { NodeSDK } from '@opentelemetry/sdk-node'; // The core SDK for Node.js, enabling instrumentation and telemetry data collection
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'; // Processor that batches spans for efficient processing
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'; // Exporter for sending trace data via HTTP to the OpenTelemetry Collector
import { OTLPTraceExporter as OTLPTraceGRPCExporter } from '@opentelemetry/exporter-trace-otlp-grpc'; // Exporter for sending trace data via gRPC
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'; // Exporter for sending metrics data via HTTP
import { OTLPMetricExporter as OTLPMetricGRPCExporter } from '@opentelemetry/exporter-metrics-otlp-grpc'; // Exporter for sending metrics data via gRPC
import { Resource } from '@opentelemetry/resources'; // Module for defining resources associated with telemetry data
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'; // Predefined attributes to describe resources in telemetry
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'; // Function to automatically instrument Node.js libraries
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'; // Reader for periodically exporting metrics to the configured exporter
import { trace } from '@opentelemetry/api'; // API for accessing OpenTelemetry tracing functionality
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino'; // Instrumentation for Pino, enabling log correlation with tracing

// Function to register OpenTelemetry configurations and start data collection
export function register() {
  // Register the OpenTelemetry service with a specified name to identify it in the telemetry data
  registerOTel('textile-plm-digitalisation'); // Service name matches the collector config for accurate data processing

  // Create an OTLP trace exporter for HTTP, which will send trace data to the specified endpoint
  const traceExporterHTTP = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces', // Endpoint for the OpenTelemetry Collector to receive trace data over HTTP
  });

  // Create an OTLP trace exporter for gRPC, enabling sending trace data via the gRPC protocol
  const traceExporterGRPC = new OTLPTraceGRPCExporter({
    url: 'localhost:4317', // gRPC endpoint for the OpenTelemetry Collector to receive trace data
  });

  // Create an OTLP metric exporter for HTTP to send metrics data to the specified endpoint
  const metricExporterHTTP = new OTLPMetricExporter({
    url: 'http://localhost:4318/v1/metrics', // Endpoint for the OpenTelemetry Collector to receive metrics data over HTTP
  });

  // Create an OTLP metric exporter for gRPC, allowing metrics data to be sent via the gRPC protocol
  const metricExporterGRPC = new OTLPMetricGRPCExporter({
    url: 'localhost:4317', // gRPC endpoint for the OpenTelemetry Collector to receive metrics data
  });

  // Set up the OpenTelemetry SDK with resource information, span processor, and metric reader configurations
  const sdk = new NodeSDK({
    resource: new Resource({
      // Define the resource attributes, specifically the service name, for proper identification in telemetry data
      [SemanticResourceAttributes.SERVICE_NAME]: 'textile-plm-digitalisation', // Service name matches the collector config
    }),
    // Use a BatchSpanProcessor to efficiently process spans and send them to the trace exporter
    spanProcessor: new BatchSpanProcessor(traceExporterHTTP), // Using HTTP exporter for sending traces
    // Define a metric reader that periodically exports metrics to the configured exporter
    metricReader: new PeriodicExportingMetricReader({
      exporter: metricExporterHTTP, // Use HTTP exporter for sending metrics
      exportIntervalMillis: 60000, // Specify the interval (in milliseconds) for exporting metrics; adjustable based on requirements
    }),
    // Specify the list of instrumentations to automatically instrument libraries and integrate them with OpenTelemetry
    instrumentations: [
      getNodeAutoInstrumentations(), // Automatically instrument supported Node.js libraries for tracing and metrics
      new PinoInstrumentation(), // Add Pino instrumentation for logging, enabling log correlation with tracing
    ],
  });

  // Start the OpenTelemetry SDK, which begins the collection of telemetry data
  sdk.start();

  // Set up error handling for uncaught exceptions in the application
  process.on('uncaughtException', (error) => {
    // Get the tracer instance for logging unhandled exceptions
    const tracer = trace.getTracer('nextjs-server');
    // Start a new span to record the unhandled exception
    const span = tracer.startSpan('Unhandled Exception');
    // Record the exception details within the span
    span.recordException(error);
    // End the span after recording the exception
    span.end();
  });

  // Set up error handling for unhandled promise rejections in the application
  process.on('unhandledRejection', (reason: unknown) => {
    // Get the tracer instance for logging unhandled rejections
    const tracer = trace.getTracer('nextjs-server');
    // Start a new span to record the unhandled rejection
    const span = tracer.startSpan('Unhandled Rejection');
    // Record the rejection reason within the span
    span.recordException(reason as any); // Ensure reason is recorded correctly
    // End the span after recording the rejection
    span.end();
  });
}

// Custom function for tracking events related to data fetching
export async function fetchData() {
  // Use the tracer to start an active span for fetching data from an external source
  await trace
    .getTracer('nextjs-server') // Get the tracer instance for the 'nextjs-server' service
    .startActiveSpan('fetchJsonPlaceholder', async (span) => {
      try {
        // Attempt to fetch data from a sample JSON placeholder API
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      } finally {
        // Add an event to the span after the fetch attempt, providing additional metadata
        span.addEvent('fetchJsonPlaceholder was called', {
          provider: 'jsonplaceholder', // Metadata indicating the source of the fetch call
          someKey: 'someValue', // Placeholder key-value pair for additional information
        });
        // End the span after recording the event
        span.end();
      }
    });
}



// -----------------------------------------------------------------------------------------

// import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
// import { CollectorTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
// import { Resource } from '@opentelemetry/resources';
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
// import { MeterProvider } from '@opentelemetry/sdk-metrics';
// import { registerInstrumentations } from '@opentelemetry/instrumentation';
// import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
// import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
// import { ConsoleLogger, LogLevel } from '@opentelemetry/core';

// // Function to initialize telemetry in the browser
// export function initializeTelemetry(serviceName) {
//   // 1. Initialize the provider for tracing in the browser
//   const tracerProvider = new WebTracerProvider({
//     resource: new Resource({
//       [SemanticResourceAttributes.SERVICE_NAME]: serviceName, // Use the provided service name
//     }),
//   });

//   // 2. Set up the Collector exporter for traces
//   const collectorExporter = new CollectorTraceExporter({
//     url: 'http://localhost:4317/v1/traces', // Adjust this URL to point to your OpenTelemetry Collector
//   });

//   // Register the span processor for traces
//   tracerProvider.addSpanProcessor(new SimpleSpanProcessor(collectorExporter));

//   // Register the provider for use in the browser
//   tracerProvider.register();

//   // 3. Initialize MeterProvider for metrics
//   const meterProvider = new MeterProvider({
//     resource: new Resource({
//       [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
//     }),
//   });

//   // Create a meter instance
//   const meter = meterProvider.getMeter(serviceName);

//   // Define metrics: e.g., request count
//   const requestCount = meter.createCounter('request_count', {
//     description: 'Counts the number of requests',
//   });

//   // 4. Register instrumentations for Fetch and document load events
//   registerInstrumentations({
//     tracerProvider,
//     instrumentations: [
//       new FetchInstrumentation(), // Automatically trace fetch API requests
//       new DocumentLoadInstrumentation(), // Automatically capture page load timings
//     ],
//   });

//   // 5. Set up logging
//   const logger = new ConsoleLogger(LogLevel.DEBUG);

//   // Function to log errors
//   const handleError = (error) => {
//     logger.error(`Error occurred: ${error.message}`);
//     // You could also capture error spans if needed
//     const span = tracerProvider.getTracer('default').startSpan('error-span');
//     span.setAttribute('error', error.message);
//     span.end();
//   };

//   // 6. Custom event logging
//   const logCustomEvent = (event) => {
//     logger.info(`Custom event: ${event}`);
//     const span = tracerProvider.getTracer('default').startSpan('custom-event');
//     span.setAttribute('event', event);
//     span.end();
//   };

//   // 7. Send logs (as custom telemetry)
//   const logCustomMessage = (message) => {
//     logger.info(`Log message: ${message}`);
//     // Simulating a log span
//     const span = tracerProvider.getTracer('default').startSpan('log-span');
//     span.setAttribute('log.message', message);
//     span.end();
//   };

//   // Return the metric, logging, and error-handling functions for use
//   return {
//     requestCount,
//     handleError,
//     logCustomEvent,
//     logCustomMessage,
//   };
// }

