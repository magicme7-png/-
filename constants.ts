
import { Guest, Table } from './types';

// Fix: Updated GUESTS with table and seat information to match the updated Guest interface
export const GUESTS: Guest[] = [
  { id: '1', name: '张伟', location: 'A区', table: 1, seat: 1 },
  { id: '2', name: '王芳', location: 'A区', table: 1, seat: 2 },
  { id: '3', name: '李强', location: 'A区', table: 2, seat: 1 },
  { id: '4', name: '刘洋', location: 'B区', table: 4, seat: 3 },
  { id: '5', name: '陈思', location: 'B区', table: 4, seat: 4 },
  { id: '6', name: '杨光', location: 'A区', table: 3, seat: 5 },
  { id: '7', name: '赵敏', location: 'B区', table: 5, seat: 2 },
  { id: '8', name: '周杰', location: 'B区', table: 5, seat: 3 },
  { id: '9', name: '吴京', location: 'A区', table: 2, seat: 6 },
  { id: '10', name: '孙俪', location: 'B区', table: 6, seat: 1 },
];

// Fix: Added and exported TABLES constant for rendering the SeatingChart
export const TABLES: Table[] = [
  { id: 1, x: 200, y: 150, capacity: 8 },
  { id: 2, x: 400, y: 150, capacity: 8 },
  { id: 3, x: 600, y: 150, capacity: 8 },
  { id: 4, x: 200, y: 350, capacity: 8 },
  { id: 5, x: 400, y: 350, capacity: 8 },
  { id: 6, x: 600, y: 350, capacity: 8 },
];

// Fix: Added schedule and facilities properties to EVENT_DETAILS as expected by geminiService
export const EVENT_DETAILS = {
  name: "2025中华文化国际传播论坛",
  venue: "北京·中国传媒大学",
  date: "2025.12.19",
  schedule: [
    { time: "09:00", activity: "开幕致辞" },
    { time: "10:30", activity: "主题演讲" },
    { time: "14:00", activity: "分论坛研讨" }
  ],
  facilities: "会场提供免费Wi-Fi（名称: CUC_Conference）；茶歇区位于报告厅外侧二楼走廊。"
};
