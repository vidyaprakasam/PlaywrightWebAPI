import { Homepage } from "../src/pages/Homepage";
import { LoginPage } from "../src/pages/Loginpage";
import {test,expect} from '@playwright/test'

let loginpage:LoginPage;
let homepage:Homepage;

test.beforeEach(async ({page})=>
{
loginpage=new LoginPage(page);
await loginpage.goToLoginPage();
await loginpage.doLogin('prakasamvidya@gmail.com','Password@123')
homepage=new Homepage(page);
})

test('validate logout link',async()=>
{
    expect(await homepage.islogoutlinkvisible()).toBeTruthy();
})
test('validate title',async()=>
{
    expect(await homepage.getHomePageTitle()).toBe('My Account');
})

test('validate headers',async()=>
{
    expect.soft(await homepage.homepageheaders()).toHaveLength(4);
    expect(await homepage.homepageheaders()).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
})
