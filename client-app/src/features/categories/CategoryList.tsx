import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { CategoryOption } from "../../app/models/categoryOption";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import CategoryListItem from "./CategoryListItem";
import { Button, Grid } from "semantic-ui-react";
import { Category } from "../../app/models/category";
import CategoryForm from "./CategoryForm";

export default observer(function CategoryList() {
    const { categoryStore } = useStore();
    const { allCategories, categoryOptionsRegistry, loadCategories, loadingInitial } = categoryStore;
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
    const [showEditForm, setShowEditForm] = useState<boolean>(false)
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false)
    const [categories, setCategories]= useState<Category[]>([]);

    useEffect(() => {

        if (categoryOptionsRegistry.size <= 1) {
            loadCategories();
            setCategories(allCategories);
        }
    }, [loadCategories, categoryOptionsRegistry.size])

    function selectCategory(category: Category) {
        setSelectedCategory(category);
        console.log('selectedCategory - ', category)
    }

    function handleEditToggle() {
        setShowEditForm(!showEditForm);
    }

    function handleCreateToggle()  {
        setShowCreateForm(!showCreateForm);
    }

    function handleSelectedCategory(category: Category){
        setSelectedCategory(category);
        setShowEditForm(true);

    }

    function handleCreateForm(){
        setShowEditForm(false);
        setShowCreateForm(true);
    }

    function  handleDelete(){

    }

    function handleCreateOrDelete(category:Category){
        category.id
        ? setCategories([...categories?.filter(x=>x.id !== category.id), category])
        : setCategories([...categories,category])
    }


    if (loadingInitial) return <LoadingComponent content='Loading Categories' />
    return (
        <>
            <h1>Categories</h1>
           
            <Grid>
                <Grid.Column width='6'>
                <Button disabled={showEditForm} content='Create Category' color="blue" onClick={handleCreateForm}/>
                    {categories.map((category:Category) => (
                        <CategoryListItem key={category.id} category={category} handleSelectedCategory={handleSelectedCategory}  handleEditToggle={handleEditToggle}  disabled = {showCreateForm} />
                    ))}
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedCategory && showEditForm && !showCreateForm
                        ?
                        <CategoryForm category={selectedCategory} toggleView={handleEditToggle} mode='edit'/>
                        : null
                    }
                    {showCreateForm && !showEditForm
                        ?
                        <CategoryForm category={undefined} toggleView={handleCreateToggle} mode='create'/>
                        : null
                    }

                </Grid.Column>
            </Grid>
        </>
    )
})