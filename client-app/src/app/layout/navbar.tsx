import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';


export default function Navbar() {
    const {activityStore} = useStore();
    
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" className='menu-header'/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item name=''>
                    <Button onClick={() =>activityStore.openForm()} positive content='Create Activity'/>
                </Menu.Item>

            </Container>
        </Menu>
    )
}