import { observer } from "mobx-react-lite";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";




export default observer(function ProfilePhotos() {
    const { profileStore: { isCurrentUser, uploadPhoto, uploading, mainLoading, setMainPhoto, deleteLoading, deletePhoto, profile } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [mainTarget, setMainTarget] = useState('');
    const [deleteTarget, setDeleteTarget] = useState('');

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => {
            setAddPhotoMode(false);
        })
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {

        setMainTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {

        setDeleteTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button floated="right" basic content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)} />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile!.photos?.map((photo: Photo) => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                basic
                                                color='green'
                                                content='Main'
                                                name={photo.id}
                                                disabled={photo.isMain}
                                                loading={mainTarget === photo.id && mainLoading}
                                                onClick={e => handleSetMainPhoto(photo, e)}
                                            />
                                            <Button
                                                basic 
                                                color='red' 
                                                icon='trash'
                                                name={photo.id}
                                                loading={deleteTarget === photo.id && deleteLoading}
                                                disabled ={photo.isMain}
                                                onClick={e => handleDeletePhoto(photo,e)}
                                                />
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}
                        </Card.Group>
                    )}

                </Grid.Column>
            </Grid>

        </Tab.Pane>
    )
})