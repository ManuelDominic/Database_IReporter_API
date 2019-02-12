# Database_IReporter_API

[![Build Status](https://travis-ci.org/ManuelDominic/Database_IReporter_API.svg?branch=develop)](https://travis-ci.org/ManuelDominic/Database_IReporter_API) [![Coverage Status](https://coveralls.io/repos/github/ManuelDominic/Database_IReporter_API/badge.svg)](https://coveralls.io/github/ManuelDominic/Database_IReporter_API?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/f664ff6e611f1039b146/maintainability)](https://codeclimate.com/github/ManuelDominic/Database_IReporter_API/maintainability) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/3181e05c8bf446d28777c216c0d1432a)](https://www.codacy.com/app/ManuelDominic/Database_IReporter_API?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ManuelDominic/Database_IReporter_API&amp;utm_campaign=Badge_Grade)

## About

-   IReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention

## Features

-   Users can create an account and log in
-   Users can create a red-flag record (An incident linked to corruption
-   Users can create intervention record (a call for a government agency to intervene e.g repair bad road sections, collapsed bridges, flooding e.t.c)
-   Users can edit their red-flag or intervention records
-   Users can delete their red-flag or intervention records
-   Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention records
-   Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or intervention records
-   Admin can change the status of a record to either under investigation, rejected (in the event of a false claim) or resolved (in the event that the claim has been investigated and resolved)
-   Users can add images to their red-flag or intervention records, to support their claims
-   Users can add videos to their red-flag or intervention records, to support their claims

## Getting Started

-   Access API Documentation for the project v3 from this [[link](https://app.swaggerhub.com/apis/ManuelDominic/Ireporterv3/1.0.0)]

-   Access The Fetch API project on gh-pages v3 from this [[link](https://manueldominic.github.io/Database_IReporter_API/)]

## Prerequisites

-   A computer with an operating system (Linux, MacOS or Windows can do the job) Python 3.6.6
-   Pytest or any other preffered python tesing tool
-   Postman to test the API endpoints
-   A preffered text editor
-   Git to keep track of the different project branches

## Installing

-   Clone the project from this [[link](https://github.com/ManuelDominic/Database_IReporter_API.git)]
-   Open your terminal or command prompt for linux users

### Type

-   $ cd IReporter_API
-   $ virtualenv venv
-   ($ . venv/bin/activate/ $ source venv/Scripts/activate)
-   $ git checkout develop
-   ($ pip install -r requirements.txt)
-   $ python run.py

## Deployment

-   The API is hosted on Heroku. Use the [[link](https://ireporter-api-v3.herokuapp.com/api/v1/)] to navigate to it.

## Testing the Api

-   Run the command below to install pytest in your virtual environment
```
$ pip install pytest
```
-   Run the tests
```
$ pytest -vv --cov
```

## Versioning

-   This is version one "v3" of the API

## End Points(Required Features)

|                   End Point                               |           Functionality       |
|  ---------------------------------------------------------|-------------------------------
| POST   api/v3/auth/login                                  | Login to application          |
| POST   api/v3/auth/signup                                 | Register an account           |
| POST   api/v3/red-flags                                   | Create a red-flag             |
| GET    api/v3/red-flags                                   | Fetch all red-flags           |
| GET    api/v3/red-flags/<int:redflag_Id>                  | Fetch a red-flag              |
| PATCH  api/v3/red-flags/<int:redflag_Id>/record           | Edit red-flag record          |
| POST   api/v3/intervention                                | Create a intervention         |
| GET    api/v3/intervention                                | Fetch all intervention        |
| GET    api/v3/intervention/<int:intervention_Id>          | Fetch a intervention          |
| PATCH  api/v3/intervention/<int:intervention_Id>/record   | Edit intervention record      |
| PATCH  api/v3/red-flags/<int:redflag_Id>/status           | Edit red-flag status          |
| PATCH  api/v3/intervention/<int:intervention_Id>/status   | Edit intervention status      |
| PATCH  api/v3/intervention/<int:intervention_Id>/addimage | Add image on an intervention  |
| PATCH  api/v3/red-flags/<int:redflag_Id>/addimage         | Add image on a redflag        |

## Built With

-   Python 3.6.6 Flask (A python microframework)

## Tools Used

-   Pylint
-   Pytest
-   Virtual environment

## Authors

-   Matembu Emmanuel Dominic
-   Email : ematembu2@gmail.com

## Acknowledgements

-   Acknowledgement to the Almighty God and Andela for making cohort 15 possible where cadidates are motivated.
