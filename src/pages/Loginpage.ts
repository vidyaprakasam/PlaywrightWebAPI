import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage
{
    //1.private Locators
    private readonly emailid:Locator;
    private readonly password:Locator;
    private readonly loginbtn:Locator;
    private readonly forgetpwdlink:Locator
    private readonly errormsg:Locator
    private readonly registerlink:Locator;


    //2.constructor of the page class:init the locators
    constructor(page:Page)
    {
        super(page);// to pass to parent class
        this.emailid=page.getByRole('textbox',{name:'E-Mail Address'});
        this.password=page.getByRole('textbox',{name:'Password'});
        this.loginbtn=page.getByRole('button',{name:'Login'});
        this.forgetpwdlink=page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.errormsg=page.locator('#account-login > div.alert.alert-danger:nth-of-type(1)');
         this.registerlink=page.getByRole('link', { name: 'Register' });

    }
    //3.public page actions(methods)/behaviour

    async goToLoginPage():Promise<void>
    {
        await this.page.goto('/opencart/index.php?route=account/login')
    }
async getLoginPageTitle():Promise<string>
{
   return await this.page.title();
}
async isForgetPwdLinkAvailable():Promise<boolean>
{
 return await this.forgetpwdlink.isVisible();
}
async doLogin(username:string,password:string):Promise<void>
{
    console.log(`usercreds:${username}-${password}`)
    await this.emailid.fill(username);
    await this.password.fill(password);
    await this.loginbtn.click();
}
async isInvalidLoginerrordisplayed():Promise<boolean>
{
   return await this.errormsg.isVisible();
}

async clickRegisterlink():Promise<void>
{
    return await this.registerlink.click();
}
}