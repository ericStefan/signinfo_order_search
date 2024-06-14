//引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random;
//使用mockjs模拟数据
Mock.mock('/api/dataList', (req, res) => {//当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
    let list = [];
    for(let i = 0; i < 300; i++) {
        let listObject = {
            date: Random.date("yyyy-MM-dd"),//随机生成一段中文文本。
            company: Random.ctitle(5, 15),
            address:Random.county(true),
            address_2:Random.county(true),
            name: Random.cname(),
            tel:Mock.mock({'phone|1': /^1[3-9]\d{9}$/}),
        }
        list.push(listObject);
    }
    return {
        data: list
    }
})

// 模拟请求客户详情交易信息
Mock.mock('/api/dataInfo', (req, res) => {
    let dataInfo = [];
    for(let i = 0; i < 10; i++) {
        let dataInfoObject = {
            date: Random.date("yyyy-MM-dd"),//随机生成日期。
            projectName: Random.ctitle(5, 15),
            supplier: Random.cname(),//供应商名称。
            tel:Mock.mock({'phone|1': /^1[3-9]\d{9}$/}),
            money: Random.float(1000, 100000, 2, 2),
            projectNumber: Random.id(20),//项目编号。
            url: Random.url()//项目链接。
        }
        dataInfo.push(dataInfoObject);
    }

    return{
        data: dataInfo
    }
})