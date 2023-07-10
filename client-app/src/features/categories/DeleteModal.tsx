import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { Category } from '../../app/models/category'

import { useStore } from '../../app/stores/store';

interface Props {
    category: Category |undefined;
    disabled: boolean;
    toggleView: () => void;

}

function DeleteModal({category, disabled, toggleView}: Props) {
  const [open, setOpen] = React.useState(false)

    const {categoryStore} = useStore();
    const {deleteCategory} = categoryStore;

    function handleDelete(){
        deleteCategory(category!);
        setOpen(false);
        toggleView();
    }

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button disabled={disabled} type='button' color='red' floated='right'>Delete</Button>}
    >
      <Header icon>
        <Icon name='delete' />
        Delete Category
      </Header>
      <Modal.Content>
        <p>
          {`Are you sure you want to delete ${category!.categoryName}?`}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic type='button' color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button type='button' color='green' inverted onClick={() => handleDelete()}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteModal