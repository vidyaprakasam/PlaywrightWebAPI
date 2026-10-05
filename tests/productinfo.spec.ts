import { expect, test } from "../src/fixtures/pagefixtures"
import { CsvHelper } from "../src/utils/CsvHelper";
test.beforeEach(async({loginpage})=>
{
        await loginpage.goToLoginPage();
  await loginpage.doLogin(process.env.MYUSERNAME!,process.env.MYPASSWORD!)

})

test('verify product header',async({homepage,searchresultspage,productinfopage})=>
{
await homepage.doSearch('Macbook');
await searchresultspage.selectProduct('Macbook Pro');
let header=await productinfopage.getProductHeader();
expect(header).toBe('MacBook Pro')
})
test('verify product img count',async({homepage,searchresultspage,productinfopage})=>
{
await homepage.doSearch('Macbook');
await searchresultspage.selectProduct('Macbook Pro');
let imgcount=await productinfopage.getProductImgCount();
expect(imgcount).toBe(4);
})



test('verify product info',async({homepage,searchresultspage,productinfopage,page})=>
{
await homepage.doSearch('Macbook');
await searchresultspage.selectProduct('Macbook Pro');
let actualProductInfoMap=await productinfopage.getProductInfo()
console.log('Actual product info map',actualProductInfoMap);

expect.soft(actualProductInfoMap.get('header')).toBe('MacBook Pro');
expect.soft(actualProductInfoMap.get('productimagescount')).toBe(4);
expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
expect.soft(actualProductInfoMap.get('product price')).toBe('$2,000.00');

//await page.pause();




})