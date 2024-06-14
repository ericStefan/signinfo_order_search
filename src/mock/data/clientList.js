import Mock from 'mockjs';
const code = 200;
const status = 'success';
const message = '操作成功';
const userInfoList = Mock.mock({
    'rows|50': [
     {
       id: '@guid()',
        username: '@cname',
       departmentId: '@guid()',
        mobile: /^1[385][1-9]\d{8}/,
        'departmentName|1': ['总裁办', '行政部', '人事部', '财务部', '技术部', '运营部'],
        'workNumber|1001-1999': + 1,
        address: '@county(true)'
     }
    ],
  })
export default {
  getUserInfoList: parmas => {
    const pageSize = getQueryVariable(parmas.url,'pageSize');
    const currentPage = getQueryVariable(parmas.url,'currentPage');
    const userList = userInfoList.rows.filter(
     (item, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1)
    );
   return {
     code: code,
      message: message,
      success: status,
      data: {
       total: userInfoList.rows.length,
        userList: userList
      }
    };
  }
}
function getQueryVariable(url,variable) {
  var query = url.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}