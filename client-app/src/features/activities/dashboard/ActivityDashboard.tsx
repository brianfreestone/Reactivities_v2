import React from 'react'
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import ActivityList from './ActivityList';
import ActivitiyDetails from './details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({ activities,
    selectActivity,
    selectedActivity,
    cancelSelectActivity,
    openForm,
    editMode,
    closeForm,
    createOrEdit,
    deleteActivity,
    submitting
}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                    <ActivitiyDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm} />
                }
                {editMode &&
                    <ActivityForm submitting={submitting} closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />
                }
            </Grid.Column>
        </Grid>
    )
}