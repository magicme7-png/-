
import { Guest, Table } from './types';

// 正式嘉宾名单录入
export const GUESTS: Guest[] = [
  { id: '1', name: '张三', location: 'A区1排22号', table: 0, seat: 0 },
  { id: '2', name: '李伟', location: 'B区2排11号', table: 0, seat: 0 },
];

// 维持类型定义的空导出，UI目前不显示全局平面图
export const TABLES: Table[] = [];

export const EVENT_DETAILS = {
  name: "2025中华文化国际传播论坛",
  venue: "北京·中国传媒大学",
  date: "2025.12.19",
  schedule: [],
  facilities: ""
};
