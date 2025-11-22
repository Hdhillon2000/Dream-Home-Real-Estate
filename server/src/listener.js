
import express from 'express';


export default async function serverListener(/**@type {express.Express} */app) {

  app
    .listen(process.env.PORT || 3000, () => {
      console.log('\n╔══════════════════════════════════════════════════════════╗');
      console.log('║              🚀 Express Server Starting                  ║');
      console.log('╚══════════════════════════════════════════════════════════╝\n');
      console.log(`Initializing...\n`);
      console.log(`Node: ${process.version} | Platform: ${process.platform} | Arch: ${process.arch}`);
      console.log(`PID: ${process.pid} | Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
      console.log(`Env: ${process.env.NODE_ENV || 'development'} | Port: ${process.env.PORT || 3000}\n\n`);
    })

    .on('error', (err) => {
      console.error('Server error:', err);
    })

    .on('close', () => {
      console.log('Server closed');
    })

    .on('listening', () => {
      console.log(`Server is listening for connections on port ${process.env.PORT || 3000} (${process.env.NODE_ENV || 'development'})`);
    });

};
