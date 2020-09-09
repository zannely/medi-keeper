---
languages:
- csharp
- aspx-csharp
- angular
page_type: sample
description: "This is a sample application that you can use to follow along with the Run a RESTful API with CORS in Azure App Service tutorial."
products:
- azure
- aspnet-core
- azure-app-service
---

# ASP.NET Core API for MediKeeper Task

This is an application with an in-memory database that allows the user to perform CRUD operations as well as search for a max price given an item name and search for all the available max prices.
For similar application follow along with the tutorial at: 
[Run a RESTful API with CORS in Azure App Service](https://docs.microsoft.com/azure/app-service/app-service-web-tutorial-rest-api). 

  
### Run web app locally
To run the web app locally, you will have to execute `dotnet run` in the location of your project, in this case inside `dotnet-core-api`. In your browser navigate to `http://localhost:5000`.

### Testing
Web app needs to be running locally before executing the unit tests. Please refer to instructions in `Run web app locally` above.
To start Selenium test suite, you will have to `npm install` the local package.json file. After installing dev dependencies, you can execute `npm run start` which will start webdriver-manager and in a separate terminal run `npm run test` to run medikeeper_spec.js in test folder. By default unit test will run on Chrome browser.

## License

See [LICENSE](https://github.com/zannely/medi-keeper/blob/master/LICENSE.md).

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.