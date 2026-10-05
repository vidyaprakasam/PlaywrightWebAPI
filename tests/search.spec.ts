import { expect, test } from "../src/fixtures/pagefixtures"
import { SearchResultPage } from "../src/pages/SearchResultPage";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async({loginpage})=>
{
    await loginpage.goToLoginPage();
await loginpage.doLogin(process.env.MYUSERNAME,process.env.MYPASSWORD)
  
})

test('verify serach results count',async({homepage,searchresultspage})=>
{
await homepage.doSearch('Macbook');
let resultcount=await searchresultspage.getProductSearchResultscount();
expect(resultcount).toBe(3);
})

let productdata=CsvHelper.readCsv('src/testdata/productdata.csv')
for(let e of productdata)
{
test(`verify product result count -${e.searchkey}`,async({homepage,searchresultspage,productinfopage})=>
{
await homepage.doSearch(e.searchkey);
let resultcount=await searchresultspage.getProductSearchResultscount();
expect(resultcount).toBe(Number(e.resultcount));
})
}

test('verify user is able to find the product',async({homepage,searchresultspage,page})=>
{

await homepage.doSearch('macbook');
await searchresultspage.selectProduct('Macbook Pro');
expect(await page.title()).toBe('MacBook Pro');
})