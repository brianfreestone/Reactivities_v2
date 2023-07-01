import { Interface } from "readline";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";

interface Props {
    profile: Profile;
}

export default function ProfileAbout({ profile }: Props) {

    const [isEditing, setIsEditing] = useState(false);

    function handleClick() {
        setIsEditing(!isEditing);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile.displayName}`} />
                    <Button floated='right' content={isEditing ? "Cancel" : "Edit Profile"} onClick={handleClick} />
                </Grid.Column>
                <Grid.Column width={16}>
                    {isEditing ? (
                        <ProfileEditForm setEditMode={setIsEditing} />
                    ) : (
                        <span style={{whiteSpace: 'pre-wrap'}}>
                            {profile.bio}
                        </span>
                    )
                    }
                </Grid.Column>

            </Grid>
        </Tab.Pane >
    )
}