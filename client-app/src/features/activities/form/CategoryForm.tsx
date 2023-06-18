import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Category } from "../../../app/models/category";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Button, Form } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import ConfirmDeleteModal from "../../categories/DeleteModal";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface Props {
    category?: Category | undefined;
    toggleView: () => void;
    mode: string;
}

export default observer(function CategoryForm({ category: selectedCategory, toggleView, mode }: Props) {

    const initialState = selectedCategory ?? {
        id:'',
        categoryName:''
    }

    const { categoryStore } = useStore();
    const { loading, loadingInitial, updateCategory, createCategory} = categoryStore;
    const [category, setCategory] =useState(initialState)


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setCategory({...category,[name]: value})
    }

    async function handleSubmit() {
        switch (mode) {
            case 'edit':
                await updateCategory(category!);
                toggleView();
                break;  
            case 'create':
                await createCategory(category!);
                toggleView();
                break;
        }
    }

    async function handleDelete(){
      
    }
    if (loadingInitial) return <LoadingComponent content='Loading Activity...' />
    return (

        <Form onSubmit={handleSubmit} className='ui form' autoComplete='off'>
            <Form.Input placeholder='Category Name' name='categoryName' value={ category?.categoryName} onChange={handleInputChange}/>
            <ConfirmDeleteModal category={category}/>
            <Button loading={loading} floated='right' positive type='submit' content='Submit' />
            
            <Button floated='right' type='submit' content='Cancel' onClick={toggleView} />

        </Form>


    )
})