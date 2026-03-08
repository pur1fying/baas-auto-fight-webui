const User = async ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params;
    console.log(`User page for ${username}`);
    return (
        <div>
            <h1>User Page {username}</h1>
        </div>
    )
}

export default User;