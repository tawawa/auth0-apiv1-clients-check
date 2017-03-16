# What is it?

A simple hack to get all ClientIDs involved in Login Events within max. threshold of number of logins.

E.g/ answers the question:  "In the last X successful logs, which Client Ids were involved"

Deliberately uses the OLD Auth0 Management API v1 since this is what today's (as of writing) private SaaS uses.

Because we are using recursion for the log search pagination, the pageNumber limit is auto-calculated as the
tail recursive limit for the Node.js env.


## Prerequisites 

Assumes you have an Auth0 Tenant.

#### Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

#### What is Auth0?

See bottom of this README for further info...

## How to use it? 

Clone / download this sample project.

Install the dependencies 

```bash
$ npm install 
```

Create a `.env` file in the base of the project (you can simply copy the .env.sample that comes with this sample).


* `AUTH0_AUTH0_GLOBAL_CLIENT_ID`: This is your tenant's GLOBAL CLIENT ID 
* `AUTH0_GLOBAL_CLIENT_SECRET_URL`: This is your tenant's GLOBAL CLIENT SECRET 

Example, populated `.env` file:


```
AUTH0_GLOBAL_CLIENT_ID=hAOV7cpxxxxxxxxxxxxjllpBLfm8mm
AUTH0_GLOBAL_CLIENT_SECRET=YHllGcSW1xxxxxxxxxxxx-tx013N7XMxxxxxxxx5smESkjsRvf
```

You can find the Global Client informaion under `Account Settings -> Advanced -> Global Client Information` in the Auth0 dashboard

Now, just run 

```
$ npm start 
```

Congratulations, you are up and running ! 



## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.