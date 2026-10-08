
import { expect, test } from "../src/fixtures/pagefixtures"


test.beforeEach(async ({loginpage,homepage})=>
{
await loginpage.goToLoginPage();
//await loginpage.doLogin('prakasamvidya@gmail.com','Password@123')
await loginpage.doLogin(process.env.MYUSERNAME!,process.env.MYPASSWORD!)
})

test('@regression validate logout link',async({homepage})=>
{
    expect(await homepage.islogoutlinkvisible()).toBeTruthy();
})
test('@smoke validate title',async({homepage})=>
{
    expect(await homepage.getHomePageTitle()).toBe('My Account');
})

test('@regression validate headers',async({homepage})=>
{
    expect.soft(await homepage.homepageheaders()).toHaveLength(4);
    expect(await homepage.homepageheaders()).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
})
