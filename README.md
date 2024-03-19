
# Trade-My-Skills

## Project Description 
The "Trade My Skills" project is an newly resourceful web platform designed to bridge the gap between individuals seeking specific services and skilled professionals ready to offer their expertise. This dynamic website serves as a centralized hub where people can post their service requests and skilled workers can propose their services, creating a harmonious marketplace for service seekers and providers.

![1](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/01b967aa-70fb-41e8-a95c-c1aadf69425a)


### Technologies Used

In the development of Trade-My-Skills, we harnessed an array of technologies, each serving a vital role:

- Java with Spring Boot: This combination allowed us to expedite Java application development while enabling the creation of vital APIs and database repositories;

- JavaScript: Utilized to enhance the front-end with dynamic interactivity and creating a user-friendly interface;

- React: Renowned for its capacity to construct interactive and dynamic UI components, React served as our primary library for web application development.

- PostgreSQL: Acting as our primary database management system, PostgreSQL ensured efficient data storage and retrieval.

- Postman: Facilitated API testing and validation, ensuring the reliability and functionality of our APIs.

- Bootstrap: For creating impressive and responsive styling, ensuring a visually appealing and user-friendly design.


### Challenges

During development, we encountered a few challenges that managed to teach us important lessons, including:

- Spring Security: As first-time users of Spring Security, implementing security measures with Spring Security posed a substantial learning curve.

- Editing Objects and optimizing Database Architecture for a better performance, scalability and simpler design.

- GitHub Conflicts;

### Future Plans
Our future plans for Trade-My-Skills platform include:

- Automated Location Detection: This feature will allow users to post ads without manually specifying their location. By seamlessly determining the user's location, we aim to simplify the posting process and make it more convenient for our users.

- Bidding Capability for Workers: This feature will enable workers to showcase their skills and compete for opportunities, ultimately benefiting both job posters and skilled professionals. It will create a more transparent and competitive environment on the platform.

- Subscription Plans for Bidders: Recognizing the needs of active bidders, we plan to introduce subscription plans that offer enhanced capabilities. Subscribed bidders will have the ability to bid on multiple ads per day, providing them with greater flexibility and access to a wider range of opportunities. This subscription model will cater to workers who want to maximize their participation on Trade My Skills.

## Setup

### Backend Setup:

1. **Prerequisites:**
    - Ensure you have the latest LTS (Long Term Support) version of Java Development Kit (JDK) installed on your system.
    - If needed, reload Maven dependencies by right-clicking the `pom.xml` file and selecting "Maven -> Reload Project."
    - Create an SQL Database called "trademyskills" and inside "resources -> application.properties" enter your spring datasource password
    - 
![2](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/c32b645f-8f7f-48b6-b0f5-044473174e1f)


2. **Run the Server:**
    - Start the backend server by running the `MainApplication` class.
    - The server should now be up and running.


    ### Frontend Setup:

1. **Prerequisites:**
    - Make sure Node.js is installed and properly configured on your system.

2. **Install Dependencies:**
    - Navigate to the `Frontend` directory in your terminal.
    - Run the following command to install the necessary dependencies:
      ```
           npm install
      ```

3. **Run the Frontend:**
    - Once the dependencies are installed, run the following command to start the frontend:
      ```
         npm run start 
      ```

    - Click on the link provided in the terminal to open the page and experience TradeMySkills!
  


## How to Use 
  
- All Ads Page

Click the `View all Ads` navbar-button to acces page listing all the ads.

![3](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/ecb60d61-086b-4559-bd00-ed9bc21a536a)

a. Every ad can be sorted by a category mentioned above:

![4](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/1b289e32-73fb-4521-bd48-bee5f5956a1c)

b. Ads can be sorted by name/price in ascending/descending order:

![5](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/2ed63b5e-93c5-4287-9463-9a28be558ccd)

c. Ads can be find by the keyword mentions in the input:

![6](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/aa502879-a8df-413b-9177-7218f375cd57)

d. All Ads available dependng on the sorting,filtering or keywords criterias:

![7](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/6dd82534-08df-4bfe-9838-b5042b0ad30a)


- Click the `Join us` navbar-button to register into the webisite(all fields must be completed).

![8](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/e07b37f0-009a-48f4-9b07-279e281b74a3)

a. When the registration process finishes well,you will receive a welcoming email from us.

![9](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/a1b70e46-5531-43e5-bf72-ed662f4e1b65)

- Click the `Log In` navbar-button to log into the webisite.
  
![10](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/3087646e-05b7-4bb6-8e1a-006c2cbdcea3)

a. In case you forgot your account's password,you should press the "Change it Now". Here you will have to write your account's email and open the confirmation email we sent to you.

![11](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/5df34e3f-281d-48d2-9be8-7eac8472845e)
![12](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/75bbf0d1-156d-4a51-a7be-98952afdc282)

Once logged into the website,as a user,you have acces to the following buttons:

![13](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/7781b379-4f72-4f55-97c8-43d457cb8896)

- `My Profile` Page,where everyone can see your contact informations,and you can edit these stats anytime.

a.  As a CUSTOMER you can see all your ads on any Status,but as a WORKER,only as PENDING and FINALISED,becuase "Active" ads are the ones that didnt find a WORKER yet and WORKERS don't have acces to post these,only to apply to them;

b. `Edit` button lets you easily edit your contact informations;

- `Post New Ad` Page, where you can post any ad ONLY AS A CUSTOMER, NOT A WORKER,mentioning every detail of it,from title,to location;

![14](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/77b4a999-08d1-4f7c-8779-83e243866037)

- `Change Password` Page will let you change your password,by writing your actual one,and then typing twice your new one

![15](https://github.com/RaresButuc/TradeMySkills.com/assets/116391767/35fe4160-ecdf-4fe3-932e-6ebec2e7cb51)

    
5. Click the `Contact` button to access page to contact us.
    TO DO
 

## Code contributors

- David Iulian Badarau : [GitHub Profile](https://github.com/BadarauDavid)
- Rares Butuc : [GitHub Profile](https://github.com/RaresButuc)
