// src/api/user.js
import http from '@/utils/http';

// 获取客户信息
export function getCustomerInfo() {
  return http.get('/customer/customer_base_info');
}

// 获取客户订单列表
export function getOrderList(params) {
  return http.get('/customer/customer_order_info_detail/id', { params });
}

