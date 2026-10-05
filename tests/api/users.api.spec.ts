import {test,expect} from "../../src/fixtures/apifixtures";

const TOKEN=process.env.API_TOKEN;
let userid:number;


let AUTH_HEADER={
    Authorization:`Bearer ${TOKEN}`
}


//For sequential run
test.describe.serial('running e2e go rest CRUD testcases',()=>
{
    //Get test
test('get user',async({apiHelper})=>
{
  let response= await apiHelper.get('public/v2/users',AUTH_HEADER);
expect(response.status).toBe(200);
expect(response.body.length).toBeGreaterThan(0);

});

test('Post user',async({apiHelper})=>
{
      let userData=
    {
    name: 'vidhu99',
    email: `vidhu4${Date.now()}@heathcote.example`,
    gender: 'female',
    status: 'active'
    }
  let response= await apiHelper.post('public/v2/users',userData,AUTH_HEADER);
userid=response.body.id;
console.log(userid);
console.log(response.body)
expect(response.status).toBe(201);

});

test('put user',async({apiHelper})=>
{
      let userData=
    {
    name: 'vidhu22',
    email: `vidhu1${Date.now()}@heathcote.example`,
    gender: 'female',
    status: 'active'
    }
  let response= await apiHelper.put(`public/v2/users/${userid}`,userData,AUTH_HEADER);
expect(response.body.name).toBe(userData.name);

});



})