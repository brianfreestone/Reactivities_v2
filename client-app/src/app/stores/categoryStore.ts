import { makeAutoObservable, runInAction } from "mobx";
import { BooleanLiteral } from "typescript";
import agent from "../api/agent";
import { Category } from "../models/category";
import { v4 as uuid } from 'uuid'
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import { timeStamp } from "console";
import { CategoryOption } from "../models/categoryOption";

export default class CategoryStore {
    categoryRegistry = new Map<string, Category>();
    categoryOptionsRegistry = new Map<string, string>;
    selectedCategory: Category | undefined = undefined;
    categories: Category[] = [];
    categoryOptions: CategoryOption[] = [];
    editMode = true;
    createMode = false;
    loading = false;

    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get allCategories() {

        // var foo;
        // runInAction(() => {
        //     foo = Array.from(this.categoryRegistry!.values());
        // })
        return this.categories;
    }

    get allCategoryOptions() {
        return Array.from(this.categoryOptionsRegistry.values());
    }

    loadCategories = async () => {
        this.setLoadingInitial(true);
        try {
            const categories = await agent.Categories.list();
            console.log('categories - ', categories)
            categories.forEach(category => {
                this.categories.push(category);
                let categoryOption: CategoryOption = {
                    text: category.categoryName,
                    value: category.categoryName.toLowerCase()
                }
                this.categoryOptions.push(categoryOption);
                // this.categoryRegistry!.set(category.id, category);
                this.categoryOptionsRegistry.set(category.categoryName, category.categoryName.toLowerCase())

            })
        } catch (error) {
            console.log(error)
        }
        this.setLoadingInitial(false);
    }

    loadCategory = async (id: string) => {
        let category = this.getCategory(id);
        if (category) {
            this.selectedCategory = category;
            return category;
        } else {
            try {
                category = await agent.Categories.details(id);
                runInAction(() => {
                    this.selectedCategory = category;
                })
                this.setLoadingInitial(false);
                return category;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);

            }
        }
    }

    private getCategory = (id: string) => {
        return this.categoryRegistry.get(id);
    }

    showEditForm = (state: boolean)=>{
        this.editMode= state;
    }

    showCreateForm = (state: boolean)=>{
        this.createMode= state;
    }



    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    updateCategory = async (category: Category) => {
        this.loading = true;
        try {
            await agent.Categories.update(category);
            runInAction(() => {
                this.categoryOptionsRegistry.set(category.categoryName, category.categoryName.toLowerCase())
                this.selectedCategory = category;
                // this.editMode = false;
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    createCategory = async (category: Category) => {
        this.loading = true;
        category.id = uuid();

        try {
            await agent.Categories.create(category);
            runInAction(() => {
                // this.categoryRegistry!.set(category.id, category);
                this.categories.push(category);
                this.selectedCategory = category;
                // this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            console.log(error)
        }
    }

    deleteCategory = async (category: Category) => {
        this.loading = true;
        try {
            //console.log('before - ', this.categories)
            await agent.Categories.delete(category.id);
            
            runInAction(()=>{
                var foo = this.categories.indexOf(category);
               // console.log(foo)
                this.categories = this.categories.filter(c => c !== category)
                //console.log('after - ', this.categories)
                this.categoryRegistry.delete(category.id);
                this.loading=false;
            })
        } catch (error) {
            runInAction(()=>{
                this.loading= false;
            })
        }
    }
}