interface Option {
    id: number;
    text: string;
    score?: number;
  }
  
  interface Question {
    id: number;
    label: string;
    question: string;
    options: Option[];
  }