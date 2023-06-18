import React, { useEffect, useState } from 'react';
import { Category } from '../../app/models/category';
import { CategoryOption } from '../../app/models/categoryOption';
import { Button, Grid, Item, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';



interface Props {
    category: Category | undefined;
    disabled: boolean;
    handleEditToggle: () => void;
    handleSelectedCategory(category:Category): any;

}

export default function CategoryListItem({ category, disabled, handleEditToggle, handleSelectedCategory }: Props) {

    const { categoryStore } = useStore();
    const { selectedCategory, loadCategory } = categoryStore;

    useEffect(() => {
        if (category) {
            loadCategory(category.id)
        }

    }, [category, loadCategory])


    // async function handleSelectedCategory(category: Category) {
    //     handleEditToggle();
    //     loadCategory(category.id);
    //     alert('clicked');
    // }

    return (
        <Segment key={category!.id} clearing >
            {category!.categoryName!}

            <Button
                disabled={disabled}
                onClick={()=>handleSelectedCategory(category!)}
                color='teal'
                floated='right'
                content='Edit'
            />
        </Segment>
    )
}