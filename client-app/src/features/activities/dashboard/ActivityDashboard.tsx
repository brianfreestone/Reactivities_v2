import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {

    const { activityStore, categoryStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore
    const { loadCategories, categoryOptionsRegistry} = categoryStore;
    useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
        if (categoryOptionsRegistry.size <= 1) {
            loadCategories();
        }
    }, [loadActivities, activityRegistry.size]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})