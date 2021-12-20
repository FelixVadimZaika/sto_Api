import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const Profile: React.FC = () => {
    const { GethUser } = useActions();

    const { profile } = useTypedSelector((store) => store.profile);

    useEffect(() => {
        async function getUser() {
            try {
                await GethUser();
                console.log(profile.email)
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
                <li>name<span>{profile.name}</span></li>
                <li>email<span>{profile.email}</span></li>
            </ul>
        </>
    )
}

export default Profile;