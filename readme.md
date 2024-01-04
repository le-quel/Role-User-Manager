                    
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




