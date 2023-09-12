const server = Bun.serve({
    port: 3000,
    fetch(req) {
        return new Response('Welcome to bun')
    }
})
console.log(`Listening on port ${server.port}`)
