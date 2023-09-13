import {renderToString} from "react-dom/server"
const server = Bun.serve({
    hostname:'127.0.0.1',
    port: 8080,
    fetch: handler,
})
console.log(`Listening on http://${server.hostname}:${server.port}`)

type Todo = {
    id: number,
    text:string
}
const todos: Todo[] = []

async function handler(request: Request): Promise<Response> {
    const url = new URL(request.url)
    if(url.pathname === '' || url.pathname === '/') {
        return new Response(Bun.file('index.html'))
    }
    if (url.pathname ==='/todos' && request.method === "POST") {
        const {todo} = await request.json()
        if (!todo.length) return new Response ('Invalid input', {status: 500})
        todos.push({
        id: todos.length + 1,
        text: todo
         })
        return new Response(renderToString(<TodoList todos={todos}/>))
    }
    if (url.pathname ==='/todos' && request.method === "GET") {

        return new Response(renderToString(<TodoList todos={todos}/>))
    }
    return new Response('Not Found', {status: 404})
}

function TodoList(props: {todos: Todo[] }) {
    return <ul>
        {
           props.todos.length ? props.todos.map(todo => <li key={todo.id}>{todo.text}</li>) : 'No items added'
        }
        </ul>
}