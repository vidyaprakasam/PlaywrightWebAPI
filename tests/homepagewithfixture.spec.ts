
import { expect, test } from "../src/fixtures/pagefixtures"


test.beforeEach(async ({loginpage,homepage})=>
{
await loginpage.goToLoginPage();
//await loginpage.doLogin('prakasamvidya@gmail.com','Password@123')
await loginpage.doLogin(process.env.MYUSERNAME!,process.env.MYPASSWORD!)
})

test('validate logout link',async({homepage})=>
{
    expect(await homepage.islogoutlinkvisible()).toBeTruthy();
})
test('validate title',async({homepage})=>
{
    expect(await homepage.getHomePageTitle()).toBe('My Account');
})

test('validate headers',async({homepage})=>
{
    expect.soft(await homepage.homepageheaders()).toHaveLength(4);
    expect(await homepage.homepageheaders()).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
})
