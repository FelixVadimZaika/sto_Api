import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const Profile: React.FC = () => {
    const { fetchUser } = useActions();

    const { profile } = useTypedSelector((store) => store.profile);

    useEffect(() => {
        async function getUser() {
            try {
                await fetchUser();
            } catch (ex) {
                console.log(ex);
            }
        }
        getUser();
    }, []);

    return (
        <>
            <h1 className="text-center">User Profile</h1>
            <ul>
                <li>
                    id
                    <span>{profile.id}</span>
                </li>
                <li>
                    name
                    <span>{profile.name}</span>
                </li>
                <li>
                    email
                    <span>{profile.email}</span>
                </li>
                <li>
                    email verified at
                    <span>{profile.emailVerifiedAt}</span>
                </li>
                <li>
                    created at
                    <span>{profile.createdAt}</span>
                </li>
                <li>
                    updated at
                    <span>{profile.updatedAt}</span>
                </li>
            </ul>
        </>
    )
}

export default Profile;