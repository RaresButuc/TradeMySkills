
# Trade-My-Skills

## Project Description 
The "Trade My Skills" project is an newly resourceful web platform designed to bridge the gap between individuals seeking specific services and skilled professionals ready to offer their expertise. This dynamic website serves as a centralized hub where people can post their service requests and skilled workers can propose their services, creating a harmonious marketplace for service seekers and providers.

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176126324969066576/1.png?ex=656dbbff&is=655b46ff&hm=776813af8e3e1ecd2eed6fe14f2a628cb9c948d63aacbc488980900c0f9e1f94&" />


### Technologies Used

In the development of Trade-My-Skills, we harnessed an array of technologies, each serving a vital role:

- Java with Spring Boot: This combination allowed us to expedite Java application development while enabling the creation of vital APIs and database repositories;

- JavaScript: Utilized to enhance the front-end with dynamic interactivity and creating a user-friendly interface;

- React: Renowned for its capacity to construct interactive and dynamic UI components, React served as our primary library for web application development.

- PostgreSQL: Acting as our primary database management system, PostgreSQL ensured efficient data storage and retrieval.

- Postman: Facilitated API testing and validation, ensuring the reliability and functionality of our APIs.

- Bootstrap: For creating impressive and responsive styling, ensuring a visually appealing and user-friendly design.


### Chalanges

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

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176136576250679296/image.png?ex=656dc58b&is=655b508b&hm=dc554401302057544664f4c6c82fd3ea828aee47a0fc29a187229a2412dfccff&" />


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

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176155844463841430/image.png?ex=656dd77d&is=655b627d&hm=72ed60b6506bd9f1197805c62cbb7c84b1878d489c11a968af6a29ef3c9fbcc6&" />

a. Every ad can be sorted by a category mentioned above:
  
<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176195498022019213/All_Ads_to_be_edted.png?ex=656dfc6b&is=655b876b&hm=d3ea197736cb281e8306407bfae6c28ff3de81a49de45ec42c29301787138e40&" />

b. Ads can be sorted by name/price in ascending/descending order:
    
<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176195499699744778/sort.png?ex=656dfc6b&is=655b876b&hm=3a64461211f53ee1138e31ba1f2bb3f365615baad970545b94b598b5b1e9bbea&" />

c. Ads can be find by the keyword mentions in the input:

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176195499066400839/image.png?ex=656dfc6b&is=655b876b&hm=c58f7b905f90f7b818d1ac858078af55ed17932a1d3c1d4718625cc6fecff50a&" />

d. All Ads available dependng on the sorting,filtering or keywords criterias:

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176195498483396648/allads.png?ex=656dfc6b&is=655b876b&hm=dd655f40c9e61bf1eb97283403c97d66914d2434802a7694f59851a4ab0a06fb&" />


- Click the `Join us` navbar-button to register into the webisite(all fields must be completed).

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176159487162339411/image.png?ex=656ddae1&is=655b65e1&hm=5385ab628fd09457e00e0a91581b302d8cf9e8153f64010007a0e3fa54910661&" />

a. When the registration process finishes well,you will receive a welcoming email from us;

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176170545209950249/image.png?ex=656de52e&is=655b702e&hm=679e4c36bd30ac71a56f5167e8ed1489f4a61008aee43a59a5266040246056e5&" />

- Click the `Log In` navbar-button to log into the webisite.

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176159962741878804/image.png?ex=656ddb53&is=655b6653&hm=4aed79e6945013212af9e134a40d915fc65869789d382ae4d2e60159f42b4a56&" />

a. In case you forgot your account's password,you should press the "Change it Now". Here you will have to write your account's email and open the confirmation email we sent to you.

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176171551549308949/image.png?ex=656de61e&is=655b711e&hm=4fa954a2b57ee6116316acad8060ac743f158558483f8ca6e823d42ef4acfc30&" />
<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176171935068065802/image.png?ex=656de679&is=655b7179&hm=b0a98187d5b04ca9c00416ee146efb44c600f29446e73fadc4baaa1fa5d17696&" />


Once logged into the website,as a user,you have acces to the following buttons:

<img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176175923310100610/image.png?ex=656dea30&is=655b7530&hm=9b3dd51f0d346c46e44db6f177a507d08db17d44aef22841725320bdb4b20492&" />

- `My Profile` Page,where everyone can see your contact informations,and you can edit these stats anytime.

a.  As a CUSTOMER you can see all your ads on any Status,but as a WORKER,only as PENDING and FINALISED,becuase "Active" ads are the ones that didnt find a WORKER yet and WORKERS don't have acces to post these,only to apply to them;



b. `Edit` button lets you easily edit your contact informations;

- `Post New Ad` Page, where you can post any ad ONLY AS A CUSTOMER, NOT A WORKER,mentioning every detail of it,from title,to location;

  <img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176151883337961543/image.png?ex=656dd3cc&is=655b5ecc&hm=13ea14bcc73088d4f330e218bdc2902d179a821c429ab20aa7906b8595b0b1af&" />


- `Change Password` Page will let you change your password,by writing your actual one,and then typing twice your new one

 <img src="https://cdn.discordapp.com/attachments/1080812341693784124/1176192723968077844/image.png?ex=656df9d5&is=655b84d5&hm=8aa8fa7888c7820a1fe131857f96d58a4db9c7e0d8441c40765c15bc05fd60b4&" />

![Screenshot 2023-10-09 145135-log-in](https://github.com/CodecoolGlobal/el-proyecte-grande-sprint-1-java-RaresButuc/assets/115742553/cda5a74e-eb2e-4cfe-9b23-b00263e3b63c)

    
5. Click the `Contact` button to access page to contact us.
    TO DO
 

## Code contributors

- David Iulian Badarau : [GitHub Profile](https://github.com/BadarauDavid)
- Rares Butuc : [GitHub Profile](https://github.com/RaresButuc)
