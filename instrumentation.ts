// Import necessary modules for OpenTelemetry and Pino logging
import { registerOTel } from '@vercel/otel'; 
import { NodeSDK } from '@opentelemetry/sdk-node'; 
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'; 
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'; 
import { OTLPTraceExporter as OTLPTraceGRPCExporter } from '@opentelemetry/exporter-trace-otlp-grpc'; 
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'; 
import { OTLPMetricExporter as OTLPMetricGRPCExporter } from '@opentelemetry/exporter-metrics-otlp-grpc'; 
import { Resource } from '@opentelemetry/resources'; 
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'; 
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'; 
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'; 
import { trace } from '@opentelemetry/api'; 
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino'; 

export function register() {
  registerOTel('textile-plm-digitalisation'); 

  const traceExporterHTTP = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
  });

  const traceExporterGRPC = new OTLPTraceGRPCExporter({
    url: 'localhost:4317',
  });

  const metricExporterHTTP = new OTLPMetricExporter({
    url: 'http://localhost:4318/v1/metrics',
  });

  const metricExporterGRPC = new OTLPMetricGRPCExporter({
    url: 'localhost:4317',
  });

  const sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'textile-plm-digitalisation',
    }),
    spanProcessor: new BatchSpanProcessor(traceExporterHTTP),
    metricReader: new PeriodicExportingMetricReader({
      exporter: metricExporterHTTP,
      exportIntervalMillis: 60000,
    }),
    instrumentations: [
      getNodeAutoInstrumentations(),
      new PinoInstrumentation({
        disableLogSending: false, // Enable log sending
      }),
    ],
  });

  sdk.start();

  process.on('uncaughtException', (error) => {
    const tracer = trace.getTracer('nextjs-server');
    const span = tracer.startSpan('Unhandled Exception');
    span.recordException(error);
    span.end();
  });

  process.on('unhandledRejection', (reason: unknown) => {
    const tracer = trace.getTracer('nextjs-server');
    const span = tracer.startSpan('Unhandled Rejection');
    span.recordException(reason as any);
    span.end();
  });
}

export async function fetchData() {
  await trace
    .getTracer('nextjs-server')
    .startActiveSpan('fetchJsonPlaceholder', async (span) => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      } finally {
        span.addEvent('fetchJsonPlaceholder was called', {
          provider: 'jsonplaceholder',
          someKey: 'someValue',
        });
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

