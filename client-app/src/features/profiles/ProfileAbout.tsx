import { Interface } from "readline";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import { useStore } from "../../app/stores/store";

export default function ProfileAbout() {
    const { profileStore } = useStore();
    const { isCurrentUser, profile } = profileStore
    const [isEditing, setIsEditing] = useState(false);

    function handleClick() {
        setIsEditing(!isEditing);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile!.displayName}`} />
                    {isCurrentUser && (
                        <Button floated='right' content={isEditing ? "Cancel" : "Edit Profile"} onClick={handleClick} />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {isEditing ? (
                        <ProfileEditForm setEditMode={setIsEditing} />
                    ) : (
                        <span style={{ whiteSpace: 'pre-wrap' }}>
                            {profile!.bio}
                        </span>
                    )
                    }
                </Grid.Column>

            </Grid>
        </Tab.Pane >
    )
}