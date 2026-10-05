import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultPage extends BasePage
{
    //1.private Locators
    private readonly searchResults:Locator;
    //private readonly :Locator;
    


    //2.constructor of the page class:init the locators
    constructor(page:Page)
    {
        super(page);// to pass to parent class
        this.searchResults=page.locator('div.product-layout');
        

    }
    //3.public page actions(methods)/behaviour

    async getProductSearchResultscount():Promise<number>
    {
        return await this.searchResults.count();
    }

    async selectProduct(productname:string)
    {
        console.log('select the product'+productname);
        //dynamic locators should be written inside the method only
        await this.page.getByRole('link', { name: productname }).first().click();
    }
}