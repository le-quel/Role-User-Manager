import express from "express";

/**
 * 
 * @param {*} app 
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");   //cấu hình ở đây để khi nào cần render file html ra browser thì chỉ cần nhập mỗi tên file.ejs bên controller thôi là nó sẽ tự hiểu
    // ở chỗ này nó sẽ tự thêm cái đầu src/views vào
}

export default configViewEngine;