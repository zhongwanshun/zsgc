/*
    路由模块
*/

const express = require('express');
const router = express.Router();
const service = require('./service.js');

// 路由处理
// 渲染主页
router.get('/', service.showIndex);

// 添加信息(跳转到添加信息的页面)
router.get('/toAdd', service.toAdd);
// 添加信息(提交表单)
router.post('/add', service.add);
// 跳转到编辑信息页面
router.get('/toEdit', service.toEdit);
// 编辑并且提交表单
router.post('/edit', service.edit);
// 删除信息
router.get('/delete', service.delete);
//查询信息
router.post('/', service.tosearch);


module.exports = router;