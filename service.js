/*
    业务模块
*/
const data = require('./data.json');
const path = require('path');
const fs = require('fs');
const db = require('./db.js');

// 自动生成编号（自增）
let maxBookCode = () => {
        let arr = [];
        data.forEach((item) => {
            arr.push(item.id);
        });
        return Math.max.apply(null, arr);
    }
    // 把内存数据写入文件
let writeDataToFile = (res) => {
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
        if (err) {
            res.send('server error');
        }
        // 文件写入成功之后重新跳转到主页面
        res.redirect('/');
    });
}

// 渲染主页面
exports.showIndex = (req, res) => {
    let sql = 'select * from user';
    db.base(sql, null, (result) => {
        res.render('index', { list: result });
    });
}

// 跳转到添加信息的页面
exports.toAdd = (req, res) => {
        res.render('add', {});
    }
    // 添加信息保存数据
exports.add = (req, res) => {
        // 获取表单数据
        let info = req.body;
        let book = {};
        for (let key in info) {
            book[key] = info[key];
        }
        let sql = 'insert into user set ?';
        db.base(sql, book, (result) => {
            if (result.affectedRows == 1) {
                res.redirect('/');
            }
        });
    }
    // 跳转编辑页面
exports.toEdit = (req, res) => {
        let id = req.query.id;
        let sql = 'select * from user where id=?';
        let data = [id];
        db.base(sql, data, (result) => {
            res.render('edit', result[0]);
        });
    }
    // 编辑更新数据
exports.edit = (req, res) => {
        let info = req.body;
        let sql = 'update user set username=?,password=?,description=?,email=? where id=?';
        let data = [info.username, info.password, info.description, info.email, info.id];
        db.base(sql, data, (result) => {
            if (result.affectedRows == 1) {
                res.redirect('/');
            }
        });
    }
    // 删除信息
exports.delete = (req, res) => {
    let id = req.query.id;
    let sql = 'delete from user where id=?';
    let data = [id];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            res.redirect('/');
        }
    });
}
exports.tosearch = (req, res) => {
    let username = req.query.keyword;
    let sql = 'select * from user where username=?'
    let data = [username];
    db.base(sql, data, (result) => {
        if (data[0] == username) {
            res.render('search')
            res.end();
        }
    })
}