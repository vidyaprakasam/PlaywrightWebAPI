import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/Loginpage";
import { Homepage } from "../src/pages/Homepage";

let loginpage:LoginPage;
let homepage:Homepage;
test('loginpage title test',async({page})=>
{
    loginpage=new LoginPage(page);
    await loginpage.goToLoginPage();
   let loginpagetitle= await loginpage.getLoginPageTitle();
    expect(loginpagetitle).toBe('Account Login');
})

test('Forgot password link visible or not',async({page})=>
{
    loginpage=new LoginPage(page);
    await loginpage.goToLoginPage();
    expect(await loginpage.isForgetPwdLinkAvailable()).toBeTruthy();

})

test('login ',async({page})=>
{
    loginpage=new LoginPage(page);
     homepage=new Homepage(page);

await loginpage.goToLoginPage();
await  loginpage.doLogin('prakasamvidya@gmail.com','Password@123');
expect.soft(await homepage.islogoutlinkvisible()).toBeTruthy();
expect.soft(await homepage.getHomePageTitle()).toBe('My Account');

})