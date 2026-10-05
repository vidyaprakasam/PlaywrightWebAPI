import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage{

    private readonly firstname:Locator;
    private readonly lastname:Locator;
    private readonly emailid:Locator;
    private readonly telephone:Locator;
    private readonly password:Locator;
    private readonly confirmpassword:Locator;
    private readonly privacypolicy:Locator;
    private readonly continue:Locator;



    constructor(page:Page)
    {
        super(page);
        this.firstname=page.getByRole('textbox', { name: '* First Name' });
        this.lastname=page.getByRole('textbox', { name: '* Last Name' });
        this.emailid=page.getByRole('textbox', { name: '* E-Mail' });
        this.telephone=page.getByRole('textbox', { name: '* Telephone' });
        this.password=page.locator('#input-password')
        this.confirmpassword=page.locator('#input-confirm')
        this.privacypolicy=page.getByRole('checkbox');
        this.continue=page.getByRole('button', { name: 'Continue' });
    }

    async EnterDetails(fname:string,lname:string,email:string,telephone:string,password:string,confirmpwd:string)
    {
        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.emailid.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.confirmpassword.fill(confirmpwd);
    }
    async selectprivacyandcontinue():Promise<void>
    {
        await this.privacypolicy.check();
        await this.continue.click();
    }
}