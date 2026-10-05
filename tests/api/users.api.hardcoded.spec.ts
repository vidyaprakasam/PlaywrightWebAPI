import {test,expect,request} from '@playwright/test'

let AUTH_TOKEN=
{
    Authorization:'Bearer 07c1d91aded9fb9585827b04ff3ad4903be666b75ba533b408a2f90812f88707'
};

test('get user',async({request})=>
{
  let response= await request.get('https://gorest.co.in/public/v2/users',{headers:AUTH_TOKEN});

let jsonresponse=await response.json();
let status= response.status();
let statustext= response.statusText();
console.log(jsonresponse);
console.log(status);
console.log(statustext);

});

test('create user-post',async({request})=>
{

    //user JS object

    let userData=
    {
    name: 'vidhu',
    email: 'gvidhu@heathcote.example',
    gender: 'female',
    status: 'active'
    }
  let response= await request.post('https://gorest.co.in/public/v2/users',
    {
        headers:AUTH_TOKEN,
        data:userData
    });

let jsonresponse=await response.json();
let status= response.status();//201
let statustext= response.statusText();
console.log(jsonresponse);
console.log(status);
console.log(statustext);

});

