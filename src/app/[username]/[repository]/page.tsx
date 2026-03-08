import { notFound } from "next/navigation";

const Repo = async ({ params }: { params: Promise<{ username: string, repository: string }> }) => {
    const { username, repository } = await params;

    notFound();    
    return (
        <div>
            <h1>User Page {username}</h1>
            <h1>Repo name {repository}</h1>
        </div>
    )
}

export default Repo;