import { expect, test } from "../src/fixtures/pagefixtures"
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JsonHelper";
import * as allure from "allure-js-commons";
import {meta,log} from 'reporting-labs'


test.beforeEach(async({loginpage})=>
{
        await loginpage.goToLoginPage();
  
})
test('@smoke loginpage title test',async({loginpage})=>
{
   meta({priorioty:'p3',severity:'medium',owner:'vidya',story:'101',feature:'login'})
 
   let loginpagetitle= await loginpage.getLoginPageTitle();

   await log('login page title:',loginpagetitle);
    expect(loginpagetitle).toBe('Account Login');
})

test('Forgot password link visible or not',async({loginpage})=>
{
    meta({priorioty:'p1',severity:'blocker',owner:'vidya',story:'102',feature:'login'})

   await allure.suite("Forgot password link");
await allure.severity("critical");
await allure.feature("forgot link");
await allure.story("valid link");
await allure.description("verify user can view forgot password link")

await allure.step("go to login page",async()=>
{
    expect(await loginpage.isForgetPwdLinkAvailable()).toBeTruthy();

})
    //expect(await loginpage.isForgetPwdLinkAvailable()).toBeTruthy();

})

test('login ',async({loginpage,homepage})=>
{

await allure.suite("logintests");
await allure.severity("critical");
await allure.feature("Authentication");
await allure.story("valid login");
await allure.description("verif user can login with valid credentials")

await allure.step("go to login page",async()=>
{
   await loginpage.goToLoginPage();

})

await allure.step("login with credentials",async()=>
{
await loginpage.doLogin(process.env.MYUSERNAME!, process.env.MYPASSWORD!);

})
//await loginpage.doLogin(process.env.MYUSERNAME!, process.env.MYPASSWORD!);
expect.soft(await homepage.islogoutlinkvisible()).toBeTruthy();
expect.soft(await homepage.getHomePageTitle()).toBe('My Account');

})

//Data driven approach 1
//read the data directly from csv file and loop the test row wise

//pros:Most Preferred

//1.Light weight //2.easy to maintain //3.easy to read 4.3rd part lib no license needed


let testData=CsvHelper.readCsv('src/testdata/logindata.csv')
for(let row of testData)
{
test(`login with invalid credentials -${row.username}`,async({loginpage,homepage})=>
   {
   await loginpage.goToLoginPage();

await loginpage.doLogin(row.username,row.password);
expect(await loginpage.isInvalidLoginerrordisplayed()).toBeTruthy();

})
}


//Data driven approach 2
//read xlsx data directly from excel file and loop the test row wise

//cons:1.Maintanence 2.MS license 3.get corrupted easily
let exceltestData=ExcelHelper.readExcel('src/testdata/logintestdata.xlsx','login')
for(let row of testData)
{
test(`login with invalid credentials -${row.username} -${row.password}`,async({loginpage,homepage})=>
{
   await loginpage.goToLoginPage();

      //testData(exceltestData,'invalid login data');

await loginpage.doLogin(row.username,row.password);
expect(await loginpage.isInvalidLoginerrordisplayed()).toBeTruthy();

})
}

//Data driven approach 3
//read json data directly from json file and loop the test row wise

//pros-Inbuilt method pars,light weight,amazing for small data test
//cons-not good for large data set


let jsontestData=JsonHelper.readJson('src/testdata/logindata.json')
for(let row of jsontestData)
{
test(`login with invalid credentials -${row.username} -${row.password}`,async({loginpage,homepage})=>
{
   await loginpage.goToLoginPage();
await loginpage.doLogin(row.username,row.password);
expect(await loginpage.isInvalidLoginerrordisplayed()).toBeTruthy();

})
}