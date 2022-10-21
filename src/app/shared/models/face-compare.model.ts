export interface FaceCompareModel {
  request_id: string;
  confidence: number;
  thresholds: Thresholds;
  time_used: number;
  response_id: string;
}

interface Thresholds {
  err_01: number;
  err_001: number;
  err_0001: number;
}