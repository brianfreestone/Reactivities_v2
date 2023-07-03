import { useEffect, useState } from 'react'
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller'
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

export default observer(function ActivityDashboard() {

    const { activityStore, categoryStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore
    const { loadCategories, categoryOptionsRegistry } = categoryStore;
    const [loadingNext, setLoadingNext] = useState(false);


    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => {
            setLoadingNext(false);
        })
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
        if (categoryOptionsRegistry.size <= 1) {
            loadCategories();
        }
    }, [loadActivities, activityRegistry.size]);

    return (
        <>
            <Segment>
                <h3>{pagination?.totalItems} Events</h3>
            </Segment>
            <Grid>
                <Grid.Column width='10'>
                    {activityStore.loadingInitial && !loadingNext ? (
                        <>
                            <ActivityListItemPlaceholder />
                            <ActivityListItemPlaceholder />

                        </>
                    ) :
                        <InfiniteScroll initialLoad={false} pageStart={0} loadMore={handleGetNext} hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}>
                            <ActivityList />
                        </InfiniteScroll>}

                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityFilters />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Loader active={loadingNext} />
                </Grid.Column>
            </Grid>
        </>
    )
})