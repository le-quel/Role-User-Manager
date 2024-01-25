                    
                     BÀI 1: SET UP


I. Cài Đặt Môi Trường 
    - node -v
    - npm init (cấu hình file json)
    * cài đặt express, dotenv, bodyparser, ejs (để biên dịch code html render ra view)
    - npm install --save-exact express@4.17.2 dotenv@10.0.0 body-parser@1.19.1 ejs@3.1.6
    cài đặt babel để biên dịch code giữa các version js khác nhau và nodemon để reload server
    - npm install --save-exact @babel/core@7.15.4 @babel/node@7.15.4 @babel/preset-env@7.15.4 nodemon@2.0.15
(Một lưu ý nhỏ cần thử khi install một project mới thì có thể linh động các phiên bản phía sau dấu @ chắc chắn là gặp lỗi nhưng mà hiện tại tui chưa biết nó sẽ gặp lỗi gì  )
II. set up thư thư mục chứa code gồm
    Src{
        configs
        controllers
        public
        routers
        services
        views
        server.js

    }
    .babelrc
    .gitignore
    .env

III. gõ vào file biên dịch babelrc để đọc biến trong js khi mà có sự thay đổi về version
    {
    "presets": [
        "@babel/preset-env"
    ]
}
IV. Tạo file viewEngine.js bên trong configs để import express
        import { Express } from "express";

        /**
        * 
        * @param {*} app 
        */
        const configViewEngine = (app) => {
            app.use(express.static('./src/public'));
            app.set("view engine", "ejs");
            app.set("views", "./src/views");
        }

        export default configViewEngine;
V. File routers tạo file web.js để import express và khởi tạo function cho nó
    import { Express } from "express";

    /**
    * @param {*} app: express app
    */
    const router = express.Router();
    const initWebRoutes = (app) => {
        router.get("/", (req, res) => {
            return res.send("Hello world!");
        })

        return app.use("/", router);
    }
    export default initWebRoutes;

VI. cấu hình file server.js để chạy server
    import { Express } from "express";
    import configViewEngine from "./configs/ViewEngine";
    import initWebRoutes from "./routers/web";

    const app = express();
    //config view engine
    configViewEngine(app);

    //init web routes
    initWebRoutes(app);

    const PORT = 8080;
    app.listen(PORT, () => {
        console.log("Chạy ngon ơ luôn nè mấy ní trên cái port"+PORT)
    })
VII. Biên dịch babel node ở file package.json để chạy thẳng bằng câu lệnh npm start
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon --exec babel-node src/server.js" // thêm câu này vào dưới "test"
  },
VIII. Chuyển đổi từ port set cứng thành port linh động bằng process.env.PORT thông qua file .env
        import express from "express";
        import configViewEngine from "./configs/ViewEngine";
        import initWebRoutes from "./routers/web";
        require("dotenv").config();
        const app = express();
        //config view engine
        configViewEngine(app);

        //init web routes
        initWebRoutes(app);

        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log("Chạy ngon ơ luôn nè mấy ní trên cái port " + PORT)
        })

=> Những lỗi gặp phải trong quá trình set up 
  có mỗi 1 lỗi do câu import express dư dấu {} nó tự import xong nó tự báo lỗi luôn ảo ệ

                            BÀI 2: DESIGN PARTERN MVC

I. Tạo file homeController trong controller sau đó chuyển hàm hendlehelloworld về homecontroller để điều hướng
sau đó import homecontroller vào file web.js và chỗ return đổi đường dẫn và đi vào lớp homecontroller.handlehelloworld là xong
import homeController from "../controllers/homeController";
 router.get("/", homeController.HandleHelloWorld)

II. Tạo file home.ejs trong view để render dữ liệu ra view thông qua 3 luồng 
 - luồng 1 là dữ liệu có sẳn trong file home
 - luồng 2 là function nằm trong file homecontroller 
 const HandleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}
- luồng 3 là đường dẫn mặc định có sẳn sẽ thay đổi mỗi cái tên file cần render mà thôi đã được config sẳn ở file viewengine
 app.set("views", "./src/views"); 

 * quy tắc render
 router(/user) = > controller => view


                        BÀI 3: CÁCH SỬ DỤNG BOOTSTRAP
-  Nhúng link cdn: cách lấy : search bootstrap cdn nhúng cả cái link và thẻ script của nó vào đầu trang html
-  một mẹo để sau này sử dụng các thư biện tương tự bootstrap là muốn lấy link để nhúng thì cứ gõ keywork "cdn" vào phía sau thư viện là nó sẽ ra link cho mình


                        BÀI 4: CREATE NEWW USER 
1 Cài đặt package mysql "npm install --save-exact mysql2@2.3.3"
2 tạo file connectDB bằng mẫu code connect ở web "mysql2 npm"
3 Cài đặt package bcrypt.js   để hash password  "npm install --save-exact bcryptjs@2.4.3"  

4 Tạo form đăng ký 
5 code luồng chạy ở file routers
    5.1 tạo một function handlecreatenewuser sau đó ấn submit để check luồng đã nhận hay chưa
6 import bodyparser vào file server.js (giúp chuyển đổi dạng dữ liệu từ data request nguyên thủy về thành data dạng json)
        import bodyParser from "body-parser";

        require("dotenv").config();
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
7 function handle thêm console.log(">>> check request", req.body)
=> lúc này check request thì ở terminal req trả về là một obj rỗng 
=> muốn obj này có data thì phải thêm thuộc tính name ở dưới mỗi input để khi ấn nút submit thì form sẽ nhận data và truyền vào cái 
mảng json này. 
8 sau khi nhập data và ấn submit thì hàm check req log ra 
>>> check request { email: 'lequelcm@gmail.com', password: '2222', username: 'adac' } là ok. 
9 copy code connect ở mysql2 npm paste vô homecontroller và đặt tên host + tên db.

                    BÀI 5: KẾT NỐI DB VÀ THÊM USER

1. ở homecontroller thêm hàm connectdb
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwt_react"
});
=> phải cài đặt package mysql "npm install --save-exact mysql"

2. ở function handlecreatenewuser thì bỏ câu quyery insert theo kiểu mysql2 vào (search mysql2 insert)

const HandleCreateNewUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    // query 
   con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO user (email, password, username) VALUES (?, ?, ?)";
        con.query(sql, [email, password, username], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
    console.log(">>> check request", req.body);
    return res.send("hello neww user");
}
3. Nhập data vào ấn submit và dữ liệu load lên terminal  và check db nếu load đúng là ok 

                            BÀI 6: HASH PASSWORD VỚI BCRYPTS
            
1. ở file homecontroller gõ 
        // hash password vs bcrypts
        import bcrypts from "bcryptjs";

        const salt = bcrypts.genSaltSync(10);

        let hash = bcrypts.hashSync("B4c0/\/", salt)
2. trong function createnewuser gõ 
  let hashPassword = bcrypts.hashSync("B4c0/\/", salt) // hash password
    console.log(">>>Check hashpasword:", hashPassword); là hash thành công

    tạo biến băm ngược 
    let check = bcrypts.compareSync(password, hashPassword);
    console.log(">>> check password: ", true);
3. tạo file userSevices.js
var mysql = require('mysql');
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwt_react"
});

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const CreateNewUser = (email, password, username, res) => {
    let hashPass = hashUserPassword(password);
    console.log(">>> Check hashpassword:", hashPass);

    let check = bcrypt.compareSync(password, hashPass); // băm ngược
    console.log(">>> Check password:", check);

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO user (email, password, username) VALUES (?, ?, ?)";
        con.query(sql, [email, hashPass, username], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

    // Do not use return res.send outside of a route handler
    // You should handle the response within the route handler where CreateNewUser is called
}

module.exports = {
    CreateNewUser
};

4. load user ra table
4.1 Viết function loaduser ở file services
    const getallUser = () => {
    let user = []
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "Select * from user ";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

}
4.2 Nối nó vào controller 
        const Handle_getallUser = (req, res) => {
            userServices.getallUser();
            return res.send("gọi tăt cả user")
        }
4.3 Khai báo 1 cái router đường dẫn cho nó ở file web.js
        router.get("/getall-user", homeController.Handle_getallUser)

                    BÀI 7: RENDER USER RA VIEW 

1. cài đặt package blubird để xử lý bất đồng bộ promise"npm install --save-exact bluebird@3.7.2"
2. file serviecs import mysql promise "var mysql = require('mysql/promise');"
var conection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwt_react",
    promise: blubird,
});
ở function getall user thì trả ra userlist bằng obj {userlist} để ejs hiểu
ở file listuser.ejs thì search gg list data with ejs để bê được cách xuất mảng bằng các cột 

 <% userList.forEach(function(item,index){ %>
                <tr>
                    <th scope="row">
                        <%= index + 1 %>
                    </th>
                    <td>
                        <%= item.email %>
                    </td>
                    <td>
                        <%= item.password %>
                    </td>
                    <td>
                        <%= item.username %>
                    </td>
                    <td>
                        <a href=""><i class="fa-solid fa-trash"></i></a> | <a href=""><i
                                class="fa-solid fa-pen-to-square"></i></a>
                    </td>
                </tr>

                <% }) %>


                            BÀI 8: DELETE USER

1. Viết hàm xóa ở file service  và exports

const HandleDeleteUser = async (req, res) => {
    await userServices.deleteUser(req.params.id);
    let userList = await userServices.getallUser();
    return res.render("listUser.ejs", { userList });
    // ...
}
2. viết hàm handledelete ở file homecontroller
const HandleDeleteUser = async (req, res) => {
    await userServices.deleteUser(req.params.id);
    let userList = await userServices.getallUser();
    return res.render("listUser.ejs", { userList });
    // ...
}
3. đường dẫn bằng id ở file listuser.ejs
 <form action="/delete-user/<%= item.id%>" method="post">
                            <button><i class="fa-solid fa-trash"></i></button>
                        </form>
4. đường dẫn ở file web.js router 
   router.post("/delete-user/:id", homeController.HandleDeleteUser)




                            BÀI 9 : CÀI ĐẶT ORM seQUELIze
1. câu lệnh cài đặt sequelize "npm install --save-exact sequelize@6.13.0 sequelize-cli@6.3.0" sequelize-cli để chạy câu lệnh db của migration
2. sửa thư mục configs thành config theo đề xuất của sequelize
3. gõ câu lệnh "node_modules/.bin/sequelize init" để tạo thư mục được gõ trong sequelize
3. tạo file connectDb trong config  lấy code từ web sequelize v6 connect to db 
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('jwt_react', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});
const connecttion = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default connecttion();
4. import link file db vào file server

                            BÀI 10: TẠO TABLE BẰNG CÂU LỆNH SEQUELIZE

1. TRONG trang web https://sequelize.org/docs/v6/other-topics/migrations/ copy câu lẹnh để tạo db "npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string"
 npx sequelize-cli model:generate --name User --attributes email:string,password:string,username:string,address:string,sex:string,phone:stri
ng,groupId:integer
-> tạo các bảng khác cũng dùng câu lệnh này và chỉ cần sửa tên bảng với trường kiểu dữ liệu là được sau đó chạy câu lệnh khởi tạo "
 npx sequelize-cli db:migrate "
  createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
-> orm là obj relational mapping là công cụ để chuyển db từ dạng cứng về thành model để dễ tương tác
2. running migration để tạo db bằng câu lệnh " npx sequelize-cli db:migrate"
-> bảng sequelizemeta để lưu các thay đổi db và dùng thoải mái 
3. kéo xuống dùng câu lệnh tạo file seeder " npx sequelize-cli seed:generate --name demo-user"
-> running seeder "npx sequelize-cli db:seed:all"
4. bỏ câu lệnh này vào file config.json deverlopment để bỏ chữ s phía sau bảng 
thay đổi tên db ở mục database deverlopment
 "define": {
      "freezeTableName": "true"
    }
5. DỮ LIỆU MẪU DB CODE FILE SEEDER
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user', [
      {
        email: 'John Doe',
        password: '123',
        username: 'quel1'

      }, {
        email: 'John Doe',
        password: '123',
        username: 'quel2'

      }, {
        email: 'John Doe',
        password: '123',
        username: 'quel3'

      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

                            BÀI 11: CRUD BẰNG ORM KO DÙNG CÂU QUERY
1. createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
2. ở file services hàm tạo user dùng hàm ấy thày cho hàm db và bỏ luôn câu lệnh query
  await db.User.create({
        email: email,
        password: hashPass,
        username: username,


    })

3. ở file services hàm hiển thị cũng tương tự thay bằng hàm tạo 
 let users = []
    users = await db.User.findAll()
    return users; chỉ vậy là đủ để hiển thị
4. delete user 
    await db.User.destroy({
        where: {
            id: id
        }
    });
5. getoneuser

                                                    BÀI 12: SET MỐI QUAN HỆ BẰNG CÂU LỆNH 
                            
1. ĐỌC document tại sequelize assosciations, eager loading giống join quan hệ database
file group 
static associate(models) {
      // define association here
      Group.hasMany(models.User);      n-1 vs user
      Group.belongsToMany(models.Role, {through:'Group_Role'});   1-n vs role 
    } 
file user
 static associate(models) {
      // define association here
      User.belongsTo(models.Group);
      User.belongsToMany(models.Project, { through: 'User_Project' });
    }
file project
   static associate(models) {
      // define association here
      Project.belongsToMany(models.User, { through: 'User_Project' });
    }

    file migration user
    'use strict';

const { literal } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      groupId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};

file user model

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group);
      User.belongsToMany(models.Project, { through: 'User_Project' });
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    sex: DataTypes.STRING,
    phone: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

                          BÀI 13. VIẾT API 
1. ở folder routers tạo file api.js
file web.js tạo đường dẫn và import controller 
  import apicontroller from "../controllers/apicontroller";
   router.get("/api/test-api", apicontroller.testAPI)
folder controller tạo file apicontroller.js trong đó viết api

    const testAPI = (req, res) => {
        return res.status(200).json({
            message: 'ok',
            data: 'testAPI'
        })
    }

    module.exports = {
        testAPI
    }
2. gõ đường dẫn để xem api thông qua router " http://localhost:8080/api/test-api "

                                BÀI 14: FIX LỖI CROS 
                      
1. định nghĩa: đây là một lỗi dó trình duyệt phát triển nhằm để chặn những website khác dùng coockie của bạn truy cập lung tung nên nó chặn giữa các font-end còn phía backend thì không có định nghĩa này nên lấy api từ nhau thoải mái
-> và chỉ có backend cho phép những url font-end nào được truy cập mới đc 
bỏ đoạn này vào file server.js
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

file env. thêm đoạn 
REACT_URL= http://localhost:8080 để cho phép fontend nào đc truy cập

vãi ò mình vừa fix một số lỗi ở console thì phát hiện ra lỗi cú pháp ở các file khác cũng sẽ tác động đến api khiến cho quá trình trả dữ liệu bị lỗi vì vậy khi mà code phải tuân thủ cực kỳ nghiêm ngặt cú pháp của version


2. đổi verson lên node 20 để cài cors " npm install cors"
xong import vô file server
import cors from "cors";
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

3. phía fontend không dùng axios để đọc api nữa mà dùng fetch data 
 useEffect(() => {
        // axios.get("http://localhost:8080/api/test-api").then(response => {
        //     console.log(">>>check api dataa", response.data);
        // }).catch(error => {
        //     console.error(">>>check api error", error);
        // });

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/test-api');
                const result = await response.json();
                // setData(result);
                console.log(result);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, []);
4. end api

                                        BÀI 15: TÁCH API QUA FILE CORS
            
1. trong thư mục config tạo file cors.js
xong bê đống code cors bên server vào 
2. require env để nhận localhost:300 bên fontend 
require("dotenv").config();
const configCors = (app) => {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
        res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
}

export default configCors;
3. file api.js copy cả file web bỏ vào và sửa thành initApiRoutes
import express from "express";

import apicontroller from "../controllers/apicontroller";
/**
 * @param {*} app: express app
 */
const router = express.Router();

const initApiRoutes = (app) => {

    // 4 method GET-R post-C put-U delete-D
    router.get("/test-api", apicontroller.testAPI)
    return app.use("/api/v14", router);
}
export default initApiRoutes;
4. file server.js khai báo 2 thứ
// config cors
configCors(app);
// test connectdb

//init web routes
initWebRoutes(app);

                      BÀI 16: API NHẬN DATA 
    
1. Tạo router   router.post("/register", apicontroller.hanleRegister)
2. tạo function hanlde  và export 
const hanleRegister = (req, res) => {

    console.log(">>> call me", req.body);
}
3. phía font-end  search axios npm github post user để copy 
 bỏ đoạn này vào hàm hanldregister để lấy data truyền qua api về backend
 if (check == true) {
            axios.post('http://localhost:8080/api/v14/register', {
                email, phone, username, password
            })
        }
4. mỗi lần ấn reload sẽ nhận từ data từ fontend
 log ra đc 
 >>> call me {
  email: 'anhqueltandiencm@gmail.com',
  phone: '0832575905',
  username: '1231234',
  password: '123'
}


                                        BÀI 17: TẠO API THÊM MỚI USER

1. thư mục services tạo file loginRegisterServices.js và viết 4 hàm  import byscyip để băm password
import db from "../models/index";
import bcrypt from "bcryptjs";
const saltRounds = 10;

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, saltRounds);
    return hashPassword;
}
const checkEmailExist = async (userEmail) => {
    let isExist = await db.Users.findOne({
        where: { email: userEmail }
    })
    if (isExist) {
        return true;
    }
    return false;
}


const checkPhoneExist = async (userPhone) => {
    let isExist = await db.Users.findOne({
        where: { phone: userPhone }
    })
    if (isExist) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {
    // check email user exist
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email)
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 1
            }

        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist === true) {
            return {
                EM: "The phone is already exist",
                EC: 1
            }

        }
        // hasspassword
        let hasspassword = hashUserPassword(rawUserData.password)
        await db.Users.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            username: rawUserData.username,
            password: rawUserData.password
        })
        return {
            EM: "A user created is succesfully!",
            EC: 0
        }

    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrong is services in...",
            EC: 2
        }

    }

}
module.exports = {
    registerNewUser,
    checkEmailExist,
    checkPhoneExist,
    hashUserPassword
}
2. file api controler viết
import loginRegisterServices from "../services/loginRegisterServices";
const testAPI = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'testAPI'
    })
}

const hanleRegister = async (req, res) => {
    try {
        // req.body email, phone, username, password
        console.log(">>> call me", req.body);
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: '',
                DT: '1',
                data: 'err api'
            })
        }

        let data = await loginRegisterServices.registerNewUser(req.body)
        // services create user
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,     // err code 
            DT: '',        // date
            data: 'success!'
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'err form server',  // err message
            EC: '',     // err code 
            DT: '',        // date
            data: 'err api'
        })
    }

}
module.exports = {
    testAPI,
    hanleRegister
}
2. bổ sung điều kiện số lượng  ký tự mật khẩu 
 if (req.body.password && req.body.password.length < 4) {
                return res.status(200).json({
                    EM: 'Your password mush more than 3 letters',
                    EC: '',
                    DT: '1',
                    data: 'err length password'
                })
            }
3. check ở tab network -> fetch\xhr -> ấn submit -> ấn vào register để xem message trả ra nếu đúng thì ok sai thì fix lỗi 



                    BÀI 18: HÀM LOGIN CHECK TÌM USER VÀ CHECK SO PASSWORD
                
1. HÀM Ở FILE loginRegister 
const handleUserLogin = async (rawData) => {

    try {
        let user = await db.Users.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        });
        // console.log(">>>>check user obj: ", user.get({ plain: true }));
        // console.log(">>>>check user obj: ", user);
        // console.log(">>>check raw login: ", rawdata);
        // log ra câu sql vs obj user khi query bằng username hoặc phone đã trả ra thành công nên cmt để mốt xài 
        if (user) {
            console.log("tìm thấy user và bước tiếp theo là check password");
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            console.log("Password comparison result:", isCorrectPassword);
            if (isCorrectPassword) {
                return {
                    EM: "Login successful",
                    EC: 0,
                    DT: "ok"
                };
            } else {
                console.log(">>>>password sai nên chạy vào đây", rawData.valueLogin);
                return {
                    EM: "Your email or phone number or password is incorrect",
                    EC: 1
                };
            }
        } else {
            console.log(">>>>Not found user with email/phone", rawData.valueLogin);
            return {
                EM: "Your email or phone number or password is incorrect",
                EC: 1
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrong in services...",
            EC: 2
        };
    }
};
2. làm tới đâu log ra tới đó để xem nó chạy vào đâu mà fix lỗi
3. hàm ở apicontroller
const handleLogin = async (req, res) => {
    try {
        loginRegisterServices.handleUserLogin(req.body)
        return res.status(200).json({
            EM: 'Login successful',
            EC: '0',
            DT: '',
            data: 'Login success!'
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'err form server',  // err message
            EC: '',     // err code 
            DT: '',        // date
            data: 'err api'
        })
    }

}
