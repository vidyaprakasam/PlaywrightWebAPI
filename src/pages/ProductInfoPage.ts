import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage
{

    //locators
    private readonly productheader:Locator;
    private readonly productimages:Locator;
    private readonly productmetadata:Locator;
    private readonly productprizing:Locator
    private productInfoMap:Map<string,string |number>

    constructor(page:Page)
    {
        super(page);
        this.productheader=page.getByRole('heading',{level:1});
        this.productimages=page.locator('div#content li img');
        this.productmetadata=page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productprizing=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productInfoMap=new Map<string,string|number>();
    }

    async getProductHeader():Promise<string>
    {
        return await this.productheader.innerText();
    }

    async getProductImgCount():Promise<number>
        {
            await this.productimages.first().waitFor({state:'visible'});
        return await this.productimages.count();
    }

private async getProductMetaData():Promise<void>

{
let metadata=await this.productmetadata.allInnerTexts();
for(let data of metadata)
{
let meta=data.split(':');
let metakey=meta[0].trim();
let metavalue=meta[1].trim();
this.productInfoMap.set(metakey,metavalue);

}
    }

private async getProductpriceData():Promise<void>

{
let pricedata=await this.productprizing.allInnerTexts();

let productprice=pricedata[0].trim();
let exTaxPrice=pricedata[1].split(':')[1].trim();
this.productInfoMap.set('product price',productprice);
this.productInfoMap.set('ex tax price',exTaxPrice);

}
async getProductInfo()
{
    this.productInfoMap.set('header',await this.getProductHeader());
    this.productInfoMap.set('productimagescount',await this.getProductImgCount());
    await this.getProductMetaData();
     await this.getProductpriceData();
     return this.productInfoMap;


}

    }

    
