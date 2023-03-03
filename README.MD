# React JS Landing Page Template
### <a href="./">LIVE DEMO (TODO : put url to github pages here)</a> 

## Description
This is a ReactJS based landing page template, fit for a startup company/service with a one page view. The design is inspired by a template from <a href="https://www.free-css.com/assets/files/free-css-templates/preview/page234/interact/">Free-CSS.com </a>
All 'visual' data can be easily modified by changing the json files located in the data folder.

## Make it Yours!
### 1. Fork the repo
Fork the repo by clicking the fork button in the top right corner of the page. This will create a copy of this repository in your account or organisation.
### 2. Add your own data 
Change the data in the ```src/data``` folder as well as add any images to ```public/img/```
You can also change styles by modifying the ```public/css``` files.

#### 2.1. Data Structure

the data is stored in json files in the ```src/data``` folder. This folder contains the following files:
*  [```main_data.json```](#211-main_datajson) -> contains the data for the header section
*  [```project_features```](#212-project_featuresjson) -> contains the data for the project features section
*  [```project_services```](#213-project_servicesjson) -> contains the data for the project services section
*  [```project_contacts```](#214-contactsjson) -> contains the data for describing the project contacts

##### 2.1.1. ```main_data.json```

This file contains the data for the header section. The structure of the file is as follows:
```json
{
    "name_site": "Boc",
    "main_image": "https://assets.newatlas.com/dims4/default/e58452e/2147483647/strip/true/crop/1498x999+0+0/resize/1440x960!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Fb1%2Fb4%2F2a5bc31341fbaa31e2230d038f66%2Ficture1.jpeg",
    "description": "A Bon é uma empresa de tecnologia que oferece soluções para o varejo. Com o objetivo de ajudar os lojistas a vender mais, a Bon oferece uma plataforma completa de gestão de lojas, com soluções para o controle de estoque, vendas, financeiro, CRM, e-commerce, marketing e muito mais.",
    "long_name": "Box of Crayons",
    "short_name": "Boc",
    "logo": "https://www.researchobject.org/ro-crate/assets/img/ro-crate-w-text.svg"
}
```

| Field | Description |
| --- | --- |
| ```name_site``` | The name of the site |
| ```main_image``` | The url to the main image of the site |
| ```description``` | The description of the site |
| ```long_name``` | The long name of the site |
| ```short_name``` | The short name of the site |
| ```logo``` | The url to the logo of the site |

##### 2.1.2. ```project_features.json```

This file contains all the features of the project.
```json
[
    {
      "icon": "fa fa-comments-o",
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam."
    },
    {
      "icon": "fa fa-bullhorn",
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam."
    }
]
```

| Field | Description |
| --- | --- |
| ```icon``` | The icon to be displayed |
| ```title``` | The title of the feature |
| ```text``` | The description of the feature |

##### 2.1.3. ```project_services.json```

This file contains all the services for the project. These will most likely be links to your github repos.

```json
[
    {
      "icon": "fa fa-wordpress",
      "name": "Lorem ipsum dolor",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
      "link": "github.com/boxofcrayons"
    },
    {
      "icon": "fa fa-cart-arrow-down",
      "name": "Consectetur adipiscing",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
      "link": "github.com/boxofcrayons"
    }
]
```

| Field | Description |
| --- | --- |
| ```icon``` | The icon to be displayed |
| ```name``` | The name of the service |
| ```text``` | The description of the service |
| ```link``` | The link to the service |

##### 2.1.4. ```contacts.json```

This file contains all the contacts for the project. These will most likely be links to your github repos.

```json
[
    {
        "img": "img/contacts/01.jpg",
        "name": "Hugh Jass",
        "job": "Corporate Directives Executive",
        "email": "Hugh_Jasst@doe.com",
        "ORCID": "0000-0000-0000-0000",
        "affiliation": {
            "name": "University of Test",
            "id": "0000-0000-0000-0000",
            "url": "http://www.test.com"
        }
      },
      {
        "img": "img/contacts/02.jpg",
        "name": "Mike Hawk",
        "job": "Future Solutions Planner",
        "email": "hotmale@hotmail.com",
        "ORCID": "0000-0000-0000-0000",
        "affiliation": {
            "name": "University of Test",
            "id": "0000-0000-0000-0000",
            "url": "http://www.test.com"
        }
      }
]
```

###### 2.1.4.1 person

| Field | Description |
| --- | --- |
| ```img``` | The image of the contact |
| ```name``` | The name of the contact |
| ```job``` | The job of the contact |
| ```email``` | The email of the contact |
| ```ORCID``` | The ORCID of the contact |
| ```affiliation``` | The affiliation of the contact |

###### 2.1.4.2 affiliation

| Field | Description |
| --- | --- |
| ```name``` | The name of the affiliation |
| ```id``` | The id of the affiliation |
| ```url``` | The url of the affiliation |




### 3. Deploy to Github Pages

The easiest way to deploy your site is to use Github Pages. To do this, you will need to create a new repository on Github and push your code to it.
Once you have done this, you can follow the instructions <a href="https://create-react-app.dev/docs/deployment/#github-pages">here</a> to deploy your site to Github Pages.


## Credits
##### Free CSS 
<a href="https://www.free-css.com/assets/files/free-css-templates/preview/page234/interact/">Free-CSS.com </a>
