
export interface Guest {
  id: string;
  name: string;
  location: string; // 例如 "A区" 或 "B区"
  // Fix: Added table and seat properties required by geminiService and SeatingChart
  table: number;
  seat: number;
}

// Fix: Added Table interface used by the SeatingChart component
export interface Table {
  id: number;
  x: number;
  y: number;
  capacity: number;
}

// Fix: Added ChatMessage interface used by the EventConcierge component
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
