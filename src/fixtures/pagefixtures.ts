//repo of page objects-we maintain all page objects here

import {test as baseTest}from "@playwright/test"
import { LoginPage } from "../pages/Loginpage";
import { Homepage } from "../pages/Homepage";
import { BasePage } from "../pages/BasePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";

type pagefixtures=
{
    basepage:BasePage;
    loginpage:LoginPage;
    homepage:Homepage;
    registrationpage:RegistrationPage;
    searchresultspage:SearchResultPage;
    productinfopage:ProductInfoPage;
}

//extend the playwright test using baseTest.extend-inheritance
//we can use all the features of test and extended features
//use-purpose of this is what exactly you want to give to test
//name given in type pagefixtures should match the function expression

export let test=baseTest.extend<pagefixtures>({

basepage:async({page},use)=>
{
let basepage=new BasePage(page);
await use(basepage);
},

loginpage:async({page},use)=>
{
let loginpage=new LoginPage(page);
await use(loginpage);
},

homepage:async({page},use)=>
{
let homepage=new Homepage(page);
await use(homepage);
},

registrationpage:async({page},use)=>
{
let registrationpage=new RegistrationPage(page);
await use(registrationpage);
},
searchresultspage:async({page},use)=>
{
let searchresultspage=new SearchResultPage(page);
await use(searchresultspage);
},
productinfopage:async({page},use)=>
{
let productinfopage=new ProductInfoPage(page);
await use(productinfopage);
},

})

   export { expect } from "@playwright/test";
