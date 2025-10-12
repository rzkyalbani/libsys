export default function Dashboard({ auth }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">
                Welcome, Admin {auth.user.name} 👋
            </h1>
        </div>
    );
}
