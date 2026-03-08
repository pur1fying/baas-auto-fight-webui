'use client';
export default function Hello() {
    console.log("Client Component");
    return <button onClick={() => {console.log("clicked")}}>Hello World</button>;
}