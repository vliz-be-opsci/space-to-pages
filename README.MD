This file is meant to be a reference for filling in the different json files to make your bon website 

## Table of Contents

### [1. main_data.json](#maindatajson)
### [2. contacts.json](#contactsjson)


## [1. main_data.json](#maindatajson)

This file will contain all the data that will be displayed on the main page (index) of your website.

### Structure

```json
{
    "name_site": "Bon",
    "main_image": "https://www.bon.com.br/wp-content/uploads/2019/03/Logo-Bon-1.png",
    "description": "A Bon é uma empresa de tecnologia que oferece soluções para o varejo. Com o objetivo de ajudar os lojistas a vender mais, a Bon oferece uma plataforma completa de gestão de lojas, com soluções para o controle de estoque, vendas, financeiro, CRM, e-commerce, marketing e muito mais.",
    "long_name": "Bonitas tapatos",
    "short_name": "Bon",
    "url": "https://www.bon.com.br/",
    "logo": "https://www.bon.com.br/wp-content/uploads/2019/03/Logo-Bon-1.png"
}
```

### Description

| Field | Description |
| --- | --- |
| name_site | Name of the site |
| main_image | Image that will be displayed on the main page |
| description | Description of the site |
| long_name | Long name of the site |
| short_name | Short name of the site |
| url | Url of the site |
| logo | Logo of the site |

## [2. contacts.json](#contactsjson)

This file will contain all the data surrounding the contacts of your website. These will be people who will be contacted when visitors of your website will want information regarding the data and services you offer.

### Structure

```json
[
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "test@doe.com",
        "ORCID": "0000-0000-0000-0000",
        "affiliation": {
            "name": "University of Test",
            "id": "0000-0000-0000-0000",
            "url": "http://www.test.com"
        }

    }
]
```

### Description

The contacts.json file is an array of objects. Each object represents a contact. Each contact has the following fields:

#### [Contact](#contactdescription)

| Field | Description |
| --- | --- |
| firstName | First name of the contact |
| lastName | Last name of the contact |
| email | Email of the contact |
| ORCID | ORCID of the contact |
| affiliation | Affiliation of the contact |

#### [Affiliation](#affiliationdescription)

The affiliation field is an object with the following fields:

| Field | Description |
| --- | --- |
| name | Name of the affiliation |
| id | Id of the affiliation |
| url | Url of the affiliation |

