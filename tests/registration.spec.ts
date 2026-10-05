import { expect, test } from "../src/fixtures/pagefixtures"

test.beforeEach(async({loginpage})=>
{
        await loginpage.goToLoginPage();
        await loginpage.clickRegisterlink();
  
})

test('registeration ',async({registrationpage,page})=>
{

await registrationpage.EnterDetails(process.env.FIRSTNAME!, process.env.LASTNAME!,process.env.EMAIL!,process.env.TEL!,process.env.PASSWORD!,process.env.CONPASSWORD!);
await registrationpage.selectprivacyandcontinue();
expect(await page.title()).toBe('Your Account Has Been Created!');

})