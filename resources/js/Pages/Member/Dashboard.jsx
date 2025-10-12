export default function Dashboard({ auth }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Welcome, {auth.user.name}!</h1>
        </div>
    );
}
