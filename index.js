// const awsIot = require('aws-iot-device-sdk-v2');

// // Path to your certificate, private key, and root CA
// const device = awsIot.device({
//   keyPath: './460215bd4329251b153c97976deb017bba1905ad198a05429bdbd67e72720498-private.pem.key',          // Replace with your private key path
//   certPath: './460215bd4329251b153c97976deb017bba1905ad198a05429bdbd67e72720498-certificate.pem.crt',     // Replace with your certificate path
//   caPath: './rootCA.pem',     // Replace with your root CA path
//   clientId: 'web-client-' + Math.floor(Math.random() * 10000),               // Replace with your client ID
//   host: 'a1mijeo7zd14kh-ats.iot.eu-north-1.amazonaws.com'   // Replace with your IoT endpoint
// });

// // Connect to AWS IoT
// device.on('connect', function() {
//   console.log('Connected to AWS IoT');

//   // Publish a message
//   const payload = {
//     temperature: 22.5,
//     humidity: 60
//   };

//   device.publish('your/topic', JSON.stringify(payload), (err) => {
//     if (err) {
//       console.error('Publish error:', err);
//     } else {
//       console.log('Message published successfully');
//     }
//   });
// });

// // Handle errors
// device.on('error', function(error) {
//   console.error('Error:', error);
// });


/////////////////////////////////////////////////////

// const {
//     mqtt,
//     iot,
// } = require('aws-iot-device-sdk-v2');

// // ====== Configuration =======
// const config = {
//     endpoint: 'a1mijeo7zd14kh-ats.iot.eu-north-1.amazonaws.com',
//     cert: './460215bd4329251b153c97976deb017bba1905ad198a05429bdbd67e72720498-certificate.pem.crt',
//     key: './460215bd4329251b153c97976deb017bba1905ad198a05429bdbd67e72720498-private.pem.key',
//     ca: './rootCA.pem',
//     clientId: 'my-nodejs-client', // Ensure this is unique
//     topic: 'test/topic'
// };

// const clientConfig = iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path(
//     './460215bd4329251b153c97976deb017bba1905ad198a05429bdbd67e72720498-certificate.pem.crt',
//     './460215bd4329251b153c97976deb017bba1905ad198a05429bdbd67e72720498-private.pem.key'
// )
// .with_certificate_authority_from_path(undefined, './rootCA.pem')
// .with_clean_session(false)
// .with_client_id(config.clientId)
// .with_endpoint(config.endpoint)
// .build();
// // Create MQTT client
// const client = new mqtt.MqttClient();
// const connection = client.new_connection(clientConfig);

// // ====== Connect =======
// (async () => {
//     try {
//         await connection.connect();
//         console.log('Connected to AWS IoT Core');

//         // ====== Subscribe =======
//         await connection.subscribe(config.topic, mqtt.QoS.AtLeastOnce, (topic, payload) => {
//             const message = new TextDecoder('utf-8').decode(payload);
//             console.log(`Received message on topic ${topic}:`, message);
//         });
//         console.log(`Subscribed to topic ${config.topic}`);

//         // ====== Publish =======
//         const payload = JSON.stringify({ message: 'Hello from Node.js!' });
//         await connection.publish(config.topic, payload, mqtt.QoS.AtLeastOnce);
//         console.log('Message published!');

//         // Optionally keep the connection alive or disconnect after a while
//         // await new Promise(resolve => setTimeout(resolve, 5000));
//         // await connection.disconnect();
//     } catch (err) {
//         console.error('Error:', err);
//     }
// })();
///////////////////////////////////////////

const AWS = require('aws-sdk');
const awsIot = require('aws-iot-device-sdk');

// Configuration
const region = 'eu-north-1';
const identityPoolId = 'eu-north-1:722208f6-496e-44d3-a13c-b6e5d00f3f54';
const iotEndpoint = 'd0868926xlmqx81j6t9q-ats.iot.eu-north-1.amazonaws.com';
const topic_publish = 'test/topic';
const topic_subscrie = 'device/data'
// Configure AWS SDK
AWS.config.update({
    region: region,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId
    })
});

// Function to initialize IoT device
function initializeIoTDevice() {
    // Set environment variables for aws-iot-device-sdk
    process.env.AWS_ACCESS_KEY_ID = AWS.config.credentials.accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = AWS.config.credentials.secretAccessKey;
    process.env.AWS_SESSION_TOKEN = AWS.config.credentials.sessionToken;

    const device = awsIot.device({
        region: region,
        host: iotEndpoint,
        clientId: `web-client-${Math.random().toString(36).substring(7)}`,
        protocol: 'wss',
        maximumReconnectTimeMs: 8000,
        debug: true // Enable debug logs
    });

    // Handle connection
    device.on('connect', () => {
        console.log('✅ Connected to AWS IoT');
        device.subscribe(topic_subscrie, (err) => {
            if (err) {
                console.error('Subscription error:', err);
            } else {
                console.log(`Subscribed to ${topic_subscrie}`);
            }
        });
    });

    // Handle incoming messages
// Handle incoming messages and overwrite in the div
device.on('message', (topic_subscrie, payload) => {
    try {
        const message = JSON.parse(payload.toString()); // this will turn "reception" into reception
        console.log(`Message on ${topic_subscrie}:`, message);

        const targetDiv = document.getElementById('sub');

        // Just insert the plain string message
        targetDiv.innerHTML = `Robot Position Now : ${message}`;
    } catch (err) {
        console.error('Error parsing message:', err);
    }
});


    // Define the publish function (from your previous code)
function publishMessage(topic_publish, message, callback) {
    try {
        const payload = JSON.stringify(message);
        device.publish(topic_publish, payload, (err) => {
            if (err) {
                console.error('Publish error:', err);
                if (callback) callback(err);
            } else {
                console.log(`Published to ${topic_publish}:`, message);
                if (callback) callback(null);
            }
        });
    } catch (err) {
        console.error('Error preparing message:', err);
        if (callback) callback(err);
    }
}

// Add event listener for the button
document.getElementById('but1').addEventListener('click', () => {
    const message = 1;
    publishMessage(topic_publish, message, (err) => {
        if (err) {
            console.error('Failed to publish reception message:', err);
            alert('Error publishing message'); // Optional: Notify user
        } else {
            console.log('Reception message published successfully');
            alert('Message published successfully'); // Optional: Notify user
        }
    });
});
document.getElementById('but2').addEventListener('click', () => {
    const message = 2;
    publishMessage(topic_publish, message, (err) => {
        if (err) {
            console.error('Failed to publish reception message:', err);
            alert('Error publishing message'); // Optional: Notify user
        } else {
            console.log('Reception message published successfully');
            alert('Message published successfully'); // Optional: Notify user
        }
    });
});
document.getElementById('but3').addEventListener('click', () => {
    const message = 3;
    publishMessage(topic_publish, message, (err) => {
        if (err) {
            console.error('Failed to publish reception message:', err);
            alert('Error publishing message'); // Optional: Notify user
        } else {
            console.log('Reception message published successfully');
            alert('Message published successfully'); // Optional: Notify user
        }
    });
});
document.getElementById('but4').addEventListener('click', () => {
    const message = 4;
    publishMessage(topic_publish, message, (err) => {
        if (err) {
            console.error('Failed to publish reception message:', err);
            alert('Error publishing message'); // Optional: Notify user
        } else {
            console.log('Reception message published successfully');
            alert('Message published successfully'); // Optional: Notify user
        }
    });
});
    // Handle errors
    device.on('error', (error) => {
        console.error('❌ MQTT Error:', error);
    });

    // Handle disconnection
    device.on('close', () => {
        console.log('🔌 Connection closed');
    });

    // Handle reconnection
    device.on('reconnect', () => {
        console.log('🔁 Reconnected to AWS IoT');
        device.subscribe(topic_subscrie, (err) => {
            if (err) {
                console.error('Re-subscription error:', err);
            } else {
                console.log(`Re-subscribed to ${topic_subscrie}`);
            }
        });
    });
}

// Retrieve and validate credentials
AWS.config.credentials.get((err) => {
    if (err) {
        console.error('Error retrieving credentials:', err);
        return;
    }

    // Force refresh to ensure credentials are valid
    AWS.config.credentials.refresh((refreshErr) => {
        if (refreshErr) {
            console.error('Error refreshing credentials:', refreshErr);
            return;
        }

        console.log('Credentials retrieved:', {
            accessKeyId: AWS.config.credentials.accessKeyId,
            secretAccessKey: AWS.config.credentials.secretAccessKey ? '[REDACTED]' : null,
            sessionToken: AWS.config.credentials.sessionToken ? '[REDACTED]' : null
        });

        // Initialize IoT device
        initializeIoTDevice();
    });
});

// === Helper for SigV4 ===
// const SigV4Utils = {
//     getSignedUrl: function(endpoint, region, credentials) {
//         const datetime = (new Date()).toISOString().replace(/[:-]|\.\d{3}/g, '');
//         const date = datetime.substr(0, 8);
//         const service = 'iotdevicegateway';
//         const algorithm = 'AWS4-HMAC-SHA256';
//         const method = 'GET';
//         const protocol = 'wss';
//         const host = endpoint;
//         const uri = '/mqtt';

//         const credentialScope = `${date}/${region}/${service}/aws4_request`;
//         const canonicalQuerystring = `X-Amz-Algorithm=${algorithm}&X-Amz-Credential=${encodeURIComponent(credentials.accessKeyId + '/' + credentialScope)}&X-Amz-Date=${datetime}&X-Amz-SignedHeaders=host`;

//         const canonicalHeaders = `host:${host}\n`;
//         const payloadHash = 'UNSIGNED-PAYLOAD';
//         const canonicalRequest = [method, uri, canonicalQuerystring, canonicalHeaders, 'host', payloadHash].join('\n');
//         const stringToSign = [algorithm, datetime, credentialScope, AWS.util.crypto.sha256(canonicalRequest)].join('\n');

//         const signingKey = AWS.util.crypto.hmac(
//             AWS.util.crypto.hmac(
//                 AWS.util.crypto.hmac(
//                     AWS.util.crypto.hmac(`AWS4${credentials.secretAccessKey}`, date),
//                     region),
//                 service),
//             'aws4_request');

//         const signature = AWS.util.crypto.hmac(signingKey, stringToSign, 'hex');

//         return `${protocol}://${host}${uri}?${canonicalQuerystring}&X-Amz-Signature=${signature}&X-Amz-Security-Token=${encodeURIComponent(credentials.sessionToken)}`;
//     }
// };
// const mqtt = require('mqtt');
// const AWS = require('aws-sdk');

// // Configuration
// const region = 'eu-north-1';
// const identityPoolId = 'eu-north-1:722208f6-496e-44d3-a13c-b6e5d00f3f54';
// const iotEndpoint = 'd0868926xlmqx81j6t9q-ats.iot.eu-north-1.amazonaws.com';

// AWS.config.region = region;
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: identityPoolId,
// });

// async function connectToAWSIoT() {
//     try {
//         console.log('Fetching credentials...');
//         await AWS.config.credentials.getPromise();
//         console.log('Identity ID:', AWS.config.credentials.identityId);
        
//         const accessKey = AWS.config.credentials.accessKeyId;
//         const secretKey = AWS.config.credentials.secretAccessKey;
//         const sessionToken = AWS.config.credentials.sessionToken;

//         console.log('Credentials:', { accessKey, secretKey, sessionToken });

//         const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
//         const url = `wss://${iotEndpoint}/mqtt?` +
//             `X-Amz-Algorithm=AWS4-HMAC-SHA256&` +
//             `X-Amz-Credential=${encodeURIComponent(`${accessKey}/${timestamp.substr(0, 8)}/${region}/iotdevicegateway/aws4_request`)}&` +
//             `X-Amz-Date=${timestamp}&` +
//             `X-Amz-SignedHeaders=host&` +
//             `X-Amz-Signature=${generateSignature(secretKey, timestamp, region, iotEndpoint)}` +
//             (sessionToken ? `&X-Amz-Security-Token=${encodeURIComponent(sessionToken)}` : '');

//         console.log('WebSocket URL:', url);

//         const options = {
//             clientId: 'mqtt-client-' + Math.random().toString(16).substr(2, 8),
//             protocolId: 'MQTT',
//             protocolVersion: 4,
//             clean: true,
//             reconnectPeriod: 1000,
//             connectTimeout: 30 * 1000,
//             verbose: true,
//         };

//         console.log('Connecting to MQTT with clientId:', options.clientId);
//         const client = mqtt.connect(url, options);

//         client.on('connect', () => {
//             console.log('Connected to AWS IoT');
//             const topic = 'test/topic';
//             client.subscribe(topic, (err) => {
//                 if (!err) {
//                     console.log(`Subscribed to ${topic}`);
//                     const message = JSON.stringify({
//                         message: 'Hello from MQTT over WebSocket',
//                         timestamp: new Date().toISOString(),
//                     });
//                     client.publish(topic, message, { qos: 1 }, (err) => {
//                         if (!err) console.log('Message published successfully');
//                         else console.error('Publish error:', err);
//                     });
//                 } else {
//                     console.error('Subscribe error:', err);
//                 }
//             });
//         });

//         client.on('message', (topic, message) => {
//             console.log(`Received message on ${topic}: ${message.toString()}`);
//         });

//         client.on('error', (error) => {
//             console.error('Connection error:', error);
//         });

//         client.on('offline', () => {
//             console.log('MQTT client went offline');
//         });

//         client.on('reconnect', () => {
//             console.log('Attempting to reconnect...');
//         });

//         client.on('close', () => {
//             console.log('Connection closed');
//         });

//     } catch (error) {
//         console.error('Error in connection setup:', error);
//     }
// }

// function generateSignature(secretKey, timestamp, region, endpoint) {
//     const crypto = require('crypto');
//     const date = timestamp.substr(0, 8);
//     const kDate = crypto.createHmac('sha256', 'AWS4' + secretKey).update(date).digest();
//     const kRegion = crypto.createHmac('sha256', kDate).update(region).digest();
//     const kService = crypto.createHmac('sha256', kRegion).update('iotdevicegateway').digest();
//     const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
//     const stringToSign = [
//         'AWS4-HMAC-SHA256',
//         timestamp,
//         `${date}/${region}/iotdevicegateway/aws4_request`,
//         crypto.createHash('sha256').update(`GET\n/mqtt\nhost=${endpoint}\n`).digest('hex'),
//     ].join('\n');
//     return crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');
// }

// connectToAWSIoT();