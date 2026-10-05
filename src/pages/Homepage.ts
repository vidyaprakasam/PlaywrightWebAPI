import { BasePage } from "./BasePage";
import {test,Locator, Page} from "@playwright/test"

export class Homepage extends BasePage
{
//1.Locators
private readonly headers:Locator;
private readonly logoutlink:Locator;
private readonly searchBox:Locator;
private readonly searchIcon:Locator;

//2.constructor
constructor(page:Page)
{
    super(page);
    this.logoutlink=page.getByRole('link', { name: 'Logout' });
    this.headers=page.getByRole('heading',{level:2});
    this.searchBox=page.getByRole('textbox', { name: 'Search' });
    this.searchIcon=page.locator('#search button');
}
//3.page actions/ methods
async islogoutlinkvisible():Promise<boolean>
{
   return await this.logoutlink.isVisible();
}

async homepageheaders():Promise<string[]>
{
    return await this.headers.allInnerTexts();
}
async getHomePageTitle():Promise<string>
{
   return await this.page.title();
}
async doSearch(searchkey:string):Promise<void>
{
    console.log('search key is'+searchkey);
    await this.searchBox.fill(searchkey);
    await this.searchIcon.click();
}

}

